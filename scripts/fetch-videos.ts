import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Load .env.local if it exists
const envLocalPath = join(process.cwd(), ".env.local");
if (existsSync(envLocalPath)) {
	const envContent = readFileSync(envLocalPath, "utf-8");
	const envLines = envContent.split("\n");
	for (const line of envLines) {
		const trimmed = line.trim();
		if (trimmed && !trimmed.startsWith("#")) {
			const [key, ...valueParts] = trimmed.split("=");
			if (key && valueParts.length > 0) {
				const value = valueParts
					.join("=")
					.trim()
					.replace(/^["']|["']$/g, "");
				process.env[key.trim()] = value;
			}
		}
	}
}

export interface YouTubeVideo {
	videoId: string;
	videoUrl: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	publishedAt: string;
}

async function fetchJson<T>(url: string): Promise<T> {
	const res = await fetch(url);
	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`YouTube API error (${res.status}): ${text || res.statusText}`,
		);
	}
	return (await res.json()) as T;
}

/**
 * 1) Resolve @handle -> channelId
 */
export async function resolveChannelIdFromHandle(
	apiKey: string,
	handle: string,
): Promise<string> {
	const cleanHandle = handle.startsWith("@") ? handle.slice(1) : handle;

	const url =
		"https://www.googleapis.com/youtube/v3/channels" +
		`?part=id&forHandle=${encodeURIComponent(cleanHandle)}` +
		`&key=${encodeURIComponent(apiKey)}`;

	const data = await fetchJson<{
		items?: { id: string }[];
	}>(url);

	if (!data.items || data.items.length === 0) {
		throw new Error(`Could not resolve channelId for handle: ${handle}`);
	}

	return data.items[0].id;
}

/**
 * 2) Get uploads playlist ID for a given channelId
 */
export async function getUploadsPlaylistId(
	apiKey: string,
	channelId: string,
): Promise<string> {
	const url =
		"https://www.googleapis.com/youtube/v3/channels" +
		`?part=contentDetails&id=${encodeURIComponent(channelId)}` +
		`&key=${encodeURIComponent(apiKey)}`;

	const data = await fetchJson<{
		items?: {
			contentDetails: {
				relatedPlaylists: { uploads: string };
			};
		}[];
	}>(url);

	const uploads =
		data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;

	if (!uploads) {
		throw new Error(
			`Could not find uploads playlist for channelId: ${channelId}`,
		);
	}

	return uploads;
}

/**
 * 3) Fetch videos from the uploads playlist
 */
export async function getVideosFromUploadsPlaylist(
	apiKey: string,
	uploadsPlaylistId: string,
	maxResults = 20,
): Promise<YouTubeVideo[]> {
	const url =
		"https://www.googleapis.com/youtube/v3/playlistItems" +
		`?part=snippet,contentDetails&playlistId=${encodeURIComponent(
			uploadsPlaylistId,
		)}` +
		`&maxResults=${maxResults}` +
		`&key=${encodeURIComponent(apiKey)}`;

	const data = await fetchJson<{
		items?: {
			contentDetails: { videoId: string; videoPublishedAt?: string };
			snippet: {
				title: string;
				description: string;
				publishedAt: string;
				thumbnails?: {
					high?: { url: string };
					medium?: { url: string };
					default?: { url: string };
				};
			};
		}[];
	}>(url);

	if (!data.items || data.items.length === 0) {
		return [];
	}

	return data.items.map((item) => {
		const vid = item.contentDetails.videoId;
		const snippet = item.snippet;
		const thumbs = snippet.thumbnails || {};
		const thumbUrl =
			thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || "";

		return {
			videoId: vid,
			videoUrl: `https://www.youtube.com/watch?v=${vid}`,
			title: snippet.title,
			description: snippet.description,
			thumbnailUrl: thumbUrl,
			publishedAt: item.contentDetails.videoPublishedAt ?? snippet.publishedAt,
		};
	});
}

/**
 * 4) Convenience: everything in one call, starting from @handle
 */
export async function getChannelUploadsByHandle(
	apiKey: string,
	handle: string,
	maxResults = 20,
): Promise<YouTubeVideo[]> {
	const channelId = await resolveChannelIdFromHandle(apiKey, handle);
	const uploadsId = await getUploadsPlaylistId(apiKey, channelId);
	return getVideosFromUploadsPlaylist(apiKey, uploadsId, maxResults);
}
async function main() {
	const apiKey = process.env.YOUTUBE_API_KEY;
	if (!apiKey) {
		console.error("Missing YOUTUBE_API_KEY");
		process.exit(1);
	}

	const handle = "@EXEETYB";

	console.log("Fetching uploads for", handle);

	try {
		const videos = await getChannelUploadsByHandle(apiKey, handle, 20);
		console.log(`Got ${videos.length} videos.`);
		videos.forEach((v, i) => {
			console.log(
				`${i + 1}. ${v.title} (${new Date(v.publishedAt).toLocaleDateString()})`,
			);
			console.log(`   ${v.videoUrl}`);
			console.log(`   thumb: ${v.thumbnailUrl}`);
		});
	} catch (err: any) {
		console.error("Error:", err.message || err);
	}
}

main();
