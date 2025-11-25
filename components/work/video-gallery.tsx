"use client";

import { useEffect, useState } from "react";

type VideoItem = {
	id: string;
	title: string;
	url: string; // normal YouTube URL
};

type VideoGalleryProps = {
	channelUrl?: string;
	videoUrl?: string;
	channelId?: string;
	channelUsername?: string;
	maxResults?: number;
	className?: string;
};

export function VideoGallery({
	channelUrl,
	videoUrl,
	channelId,
	channelUsername,
	maxResults = 50,
	className = "",
}: VideoGalleryProps) {
	const [videos, setVideos] = useState<VideoItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchVideos() {
			try {
				setLoading(true);
				setError(null);

				// Build query parameters
				const params = new URLSearchParams();
				if (channelUrl) params.set("channelUrl", channelUrl);
				if (videoUrl) params.set("videoUrl", videoUrl);
				if (channelId) params.set("channelId", channelId);
				if (channelUsername) params.set("channelUsername", channelUsername);
				if (maxResults) params.set("maxResults", maxResults.toString());

				const response = await fetch(
					`/api/youtube-videos?${params.toString()}`,
				);
				const result = await response.json();

				if (!result.success) {
					throw new Error(result.error || "Failed to fetch videos");
				}

				// Transform API response to VideoItem format
				const videoItems: VideoItem[] = result.data.map(
					(
						video: { id: string; title: string; videoUrl: string },
						index: number,
					) => ({
						id: video.id || `video-${index}`,
						title: video.title,
						url: video.videoUrl,
					}),
				);

				setVideos(videoItems);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error("Error fetching videos:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchVideos();
	}, [channelUrl, videoUrl, channelId, channelUsername, maxResults]);

	if (loading) {
		return (
			<section className={`space-y-6 ${className}`}>
				<div className="text-center py-12">
					<p className="text-muted">Loading videos...</p>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={`space-y-6 ${className}`}>
				<div className="text-center py-12">
					<p className="text-red-500">Error: {error}</p>
				</div>
			</section>
		);
	}

	if (videos.length === 0) {
		return (
			<section className={`space-y-6 ${className}`}>
				<div className="text-center py-12">
					<p className="text-muted">No videos found.</p>
				</div>
			</section>
		);
	}

	// Convert YouTube URL to embed format
	const getEmbedUrl = (url: string): string => {
		// Handle different YouTube URL formats
		if (url.includes("youtu.be/")) {
			const videoId = url.split("youtu.be/")[1]?.split("?")[0];
			return `https://www.youtube.com/embed/${videoId}`;
		}
		if (url.includes("watch?v=")) {
			const videoId = url.split("watch?v=")[1]?.split("&")[0];
			return `https://www.youtube.com/embed/${videoId}`;
		}
		if (url.includes("embed/")) {
			return url; // Already in embed format
		}
		// Fallback: try to extract video ID from URL
		const match = url.match(
			/(?:youtube\.com\/|youtu\.be\/)(?:watch\?v=|embed\/|v\/)?([^&\n?#]+)/,
		);
		if (match && match[1]) {
			return `https://www.youtube.com/embed/${match[1]}`;
		}
		return url; // Return original if we can't parse it
	};

	return (
		<section className={`space-y-6 ${className}`}>
			{videos.map((video) => (
				<article key={video.id} className="space-y-2">
					<h3 className="text-sm font-medium">{video.title}</h3>
					<div className="aspect-video w-full overflow-hidden rounded-xl border">
						<iframe
							src={getEmbedUrl(video.url)}
							title={video.title}
							className="h-full w-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</article>
			))}
		</section>
	);
}
