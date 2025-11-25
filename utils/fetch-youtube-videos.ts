/**
 * Utility to fetch videos from a YouTube channel
 * 
 * Usage:
 * 1. Get a YouTube Data API v3 key from Google Cloud Console
 * 2. Set YOUTUBE_API_KEY environment variable
 * 3. Provide either:
 *    - Channel ID (e.g., "UCxxxxxxxxxxxxx")
 *    - Channel username (e.g., "@username")
 *    - Channel URL (e.g., "https://www.youtube.com/@username" or "https://www.youtube.com/channel/UCxxxxx")
 *    - Video URL (will extract channel from video)
 */

export interface YouTubeVideo {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	videoUrl: string;
	publishedAt: string;
	duration?: string;
	viewCount?: number;
}

export interface FetchVideosOptions {
	apiKey: string;
	channelId?: string;
	channelUsername?: string;
	channelUrl?: string;
	videoUrl?: string;
	maxResults?: number;
}

/**
 * Extract video ID from YouTube URL
 */
function extractVideoId(url: string): string | null {
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
		/youtube\.com\/watch\?.*v=([^&\n?#]+)/,
	];
	
	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match && match[1]) {
			return match[1];
		}
	}
	return null;
}

/**
 * Extract channel ID or username from URL
 */
function extractChannelInfo(url: string): { channelId?: string; username?: string } {
	// Channel ID format: youtube.com/channel/UCxxxxx
	const channelIdMatch = url.match(/youtube\.com\/channel\/([^/?]+)/);
	if (channelIdMatch) {
		return { channelId: channelIdMatch[1] };
	}
	
	// Username format: youtube.com/@username or youtube.com/c/username or youtube.com/user/username
	const usernameMatch = url.match(/youtube\.com\/(?:@|c\/|user\/)([^/?]+)/);
	if (usernameMatch) {
		return { username: usernameMatch[1] };
	}
	
	return {};
}

/**
 * Get channel ID from username
 */
async function getChannelIdFromUsername(
	username: string,
	apiKey: string,
): Promise<string | null> {
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${username}&key=${apiKey}`,
		);
		const data = await response.json();
		
		if (data.items && data.items.length > 0) {
			return data.items[0].id;
		}
		
		// Try with @ prefix removed
		const usernameWithoutAt = username.replace(/^@/, "");
		const response2 = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${usernameWithoutAt}&key=${apiKey}`,
		);
		const data2 = await response2.json();
		
		if (data2.items && data2.items.length > 0) {
			return data2.items[0].snippet.channelId;
		}
		
		return null;
	} catch (error) {
		console.error("Error fetching channel ID from username:", error);
		return null;
	}
}

/**
 * Get channel ID from video ID
 */
async function getChannelIdFromVideo(
	videoId: string,
	apiKey: string,
): Promise<string | null> {
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
		);
		const data = await response.json();
		
		if (data.items && data.items.length > 0) {
			return data.items[0].snippet.channelId;
		}
		
		return null;
	} catch (error) {
		console.error("Error fetching channel ID from video:", error);
		return null;
	}
}

/**
 * Get uploads playlist ID for a channel
 */
async function getUploadsPlaylistId(
	channelId: string,
	apiKey: string,
): Promise<string | null> {
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
		);
		const data = await response.json();
		
		if (data.items && data.items.length > 0) {
			return data.items[0].contentDetails?.relatedPlaylists?.uploads || null;
		}
		
		return null;
	} catch (error) {
		console.error("Error fetching uploads playlist:", error);
		return null;
	}
}

/**
 * Fetch videos from a playlist (with pagination)
 */
async function fetchVideosFromPlaylist(
	playlistId: string,
	apiKey: string,
	maxResults: number = 50,
): Promise<YouTubeVideo[]> {
	const videos: YouTubeVideo[] = [];
	let nextPageToken: string | undefined;
	
	try {
		do {
			const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
			url.searchParams.set("part", "snippet,contentDetails");
			url.searchParams.set("playlistId", playlistId);
			url.searchParams.set("maxResults", Math.min(maxResults - videos.length, 50).toString());
			url.searchParams.set("key", apiKey);
			
			if (nextPageToken) {
				url.searchParams.set("pageToken", nextPageToken);
			}
			
			const response = await fetch(url.toString());
			const data = await response.json();
			
			if (data.error) {
				throw new Error(`YouTube API Error: ${data.error.message}`);
			}
			
			if (data.items) {
				for (const item of data.items) {
					const videoId = item.contentDetails?.videoId;
					if (!videoId) continue;
					
					videos.push({
						id: videoId,
						title: item.snippet.title,
						description: item.snippet.description || "",
						thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || "",
						videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
						publishedAt: item.snippet.publishedAt,
					});
				}
			}
			
			nextPageToken = data.nextPageToken;
		} while (nextPageToken && videos.length < maxResults);
		
		return videos;
	} catch (error) {
		console.error("Error fetching videos from playlist:", error);
		throw error;
	}
}

/**
 * Main function to fetch videos from a YouTube channel
 */
export async function fetchYouTubeVideos(
	options: FetchVideosOptions,
): Promise<YouTubeVideo[]> {
	const { apiKey, channelId, channelUsername, channelUrl, videoUrl, maxResults = 50 } = options;
	
	let finalChannelId: string | null = null;
	
	// Determine channel ID
	if (channelId) {
		finalChannelId = channelId;
	} else if (channelUsername) {
		finalChannelId = await getChannelIdFromUsername(channelUsername, apiKey);
	} else if (channelUrl) {
		const channelInfo = extractChannelInfo(channelUrl);
		if (channelInfo.channelId) {
			finalChannelId = channelInfo.channelId;
		} else if (channelInfo.username) {
			finalChannelId = await getChannelIdFromUsername(channelInfo.username, apiKey);
		}
	} else if (videoUrl) {
		const videoId = extractVideoId(videoUrl);
		if (videoId) {
			finalChannelId = await getChannelIdFromVideo(videoId, apiKey);
		}
	}
	
	if (!finalChannelId) {
		throw new Error("Could not determine channel ID. Please provide channelId, channelUsername, channelUrl, or videoUrl.");
	}
	
	// Get uploads playlist ID
	const uploadsPlaylistId = await getUploadsPlaylistId(finalChannelId, apiKey);
	if (!uploadsPlaylistId) {
		throw new Error("Could not find uploads playlist for channel.");
	}
	
	// Fetch videos
	const videos = await fetchVideosFromPlaylist(uploadsPlaylistId, apiKey, maxResults);
	
	return videos;
}

