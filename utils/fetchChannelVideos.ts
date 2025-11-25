export interface YouTubeVideo {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	publishedAt: string;
	url: string;
}

export interface YouTubeChannelDetails {
	id: string;
	title: string;
	description: string;
	customUrl?: string;
	thumbnails: {
		default?: string;
		medium?: string;
		high?: string;
	};
	publishedAt?: string;
	subscriberCount?: number;
	videoCount?: number;
	viewCount?: number;
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
 * Resolve @handle → channelId using YouTube Data API v3
 */
export async function getChannelIdFromHandle(
	apiKey: string,
	handle: string,
): Promise<string | null> {
	const cleanHandle = handle.startsWith("@") ? handle.slice(1) : handle;

	const url =
		"https://www.googleapis.com/youtube/v3/channels" +
		`?part=id&forHandle=${encodeURIComponent(cleanHandle)}` +
		`&key=${encodeURIComponent(apiKey)}`;

	const data = await fetchJson<{
		items?: { id: string }[];
	}>(url);

	if (!data.items || data.items.length === 0) {
		return null;
	}

	return data.items[0].id;
}

async function getChannelDetailsForId(
	apiKey: string,
	channelId: string,
): Promise<YouTubeChannelDetails | null> {
	const url =
		"https://www.googleapis.com/youtube/v3/channels" +
		"?part=snippet,statistics" +
		`&id=${encodeURIComponent(channelId)}` +
		`&key=${encodeURIComponent(apiKey)}`;

	const data = await fetchJson<{
		items?: {
			id: string;
			snippet?: {
				title?: string;
				description?: string;
				customUrl?: string;
				publishedAt?: string;
				thumbnails?: {
					default?: { url: string };
					medium?: { url: string };
					high?: { url: string };
				};
			};
			statistics?: {
				subscriberCount?: string;
				videoCount?: string;
				viewCount?: string;
			};
		}[];
	}>(url);

	if (!data.items || data.items.length === 0) {
		return null;
	}

	const item = data.items[0];
	const snippet = item.snippet || {};
	const stats = item.statistics || {};

	return {
		id: item.id,
		title: snippet.title || "",
		description: snippet.description || "",
		customUrl: snippet.customUrl,
		thumbnails: {
			default: snippet.thumbnails?.default?.url,
			medium: snippet.thumbnails?.medium?.url,
			high: snippet.thumbnails?.high?.url,
		},
		publishedAt: snippet.publishedAt,
		subscriberCount: stats.subscriberCount
			? Number.parseInt(stats.subscriberCount, 10)
			: undefined,
		videoCount: stats.videoCount
			? Number.parseInt(stats.videoCount, 10)
			: undefined,
		viewCount: stats.viewCount
			? Number.parseInt(stats.viewCount, 10)
			: undefined,
	};
}

/**
 * Fetch recent videos for a given channelId
 */
async function getVideosForChannelId(
	apiKey: string,
	channelId: string,
	maxResults = 20,
): Promise<YouTubeVideo[]> {
	const url =
		"https://www.googleapis.com/youtube/v3/search" +
		`?part=snippet&channelId=${encodeURIComponent(channelId)}` +
		"&order=date&type=video" +
		`&maxResults=${maxResults}` +
		`&key=${encodeURIComponent(apiKey)}`;

	const data = await fetchJson<{
		items?: {
			id: { videoId: string };
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
		const vid = item.id.videoId;
		const snippet = item.snippet;
		const thumbs = snippet.thumbnails || {};
		const thumbUrl =
			thumbs.high?.url || thumbs.medium?.url || thumbs.default?.url || "";

		return {
			id: vid,
			title: snippet.title,
			description: snippet.description,
			publishedAt: snippet.publishedAt,
			thumbnailUrl: thumbUrl,
			url: `https://www.youtube.com/watch?v=${vid}`,
		};
	});
}

export async function getChannelDetailsByHandle(
	handle: string,
	apiKey: string,
): Promise<YouTubeChannelDetails> {
	const channelId = await getChannelIdFromHandle(apiKey, handle);

	if (!channelId) {
		throw new Error(`Could not resolve channelId for handle: ${handle}`);
	}

	const details = await getChannelDetailsForId(apiKey, channelId);

	if (!details) {
		throw new Error(
			`Could not fetch channel details for channelId=${channelId}`,
		);
	}

	return details;
}

export async function getChannelDataByHandle(
	handle: string,
	apiKey: string,
	maxResults = 20,
): Promise<{
	channel: YouTubeChannelDetails;
	videos: YouTubeVideo[];
}> {
	const channelId = await getChannelIdFromHandle(apiKey, handle);

	if (!channelId) {
		throw new Error(`Could not resolve channelId for handle: ${handle}`);
	}

	const [channel, videos] = await Promise.all([
		getChannelDetailsForId(apiKey, channelId),
		getVideosForChannelId(apiKey, channelId, maxResults),
	]);

	if (!channel) {
		throw new Error(
			`Could not fetch channel details for channelId=${channelId}`,
		);
	}

	if (videos.length === 0) {
		console.warn(
			`No videos returned for channelId=${channelId}. Channel may have no public uploads or filters may be too strict.`,
		);
	}

	return { channel, videos };
}

/**
 * Main helper: from @handle → array of videos
 */
export async function getChannelVideosByHandle(
	handle: string,
	apiKey: string,
	maxResults = 20,
): Promise<YouTubeVideo[]> {
	const { videos } = await getChannelDataByHandle(handle, apiKey, maxResults);
	return videos;
}
