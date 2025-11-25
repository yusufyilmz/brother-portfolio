import { NextRequest, NextResponse } from "next/server";
import { fetchYouTubeVideos } from "@/utils/fetch-youtube-videos";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const apiKey = searchParams.get("apiKey") || process.env.YOUTUBE_API_KEY;
	const channelUrl = searchParams.get("channelUrl");
	const videoUrl = searchParams.get("videoUrl");
	const channelId = searchParams.get("channelId");
	const channelUsername = searchParams.get("channelUsername");
	const maxResults = parseInt(searchParams.get("maxResults") || "50", 10);

	if (!apiKey) {
		return NextResponse.json(
			{
				error:
					"YOUTUBE_API_KEY is required. Provide it as a query parameter or set it as an environment variable.",
				success: false,
				data: null,
			},
			{ status: 400 },
		);
	}

	if (!channelUrl && !videoUrl && !channelId && !channelUsername) {
		return NextResponse.json(
			{
				error:
					"Please provide one of: channelUrl, videoUrl, channelId, or channelUsername",
				success: false,
				data: null,
			},
			{ status: 400 },
		);
	}

	try {
		const videos = await fetchYouTubeVideos({
			apiKey,
			channelUrl: channelUrl || undefined,
			videoUrl: videoUrl || undefined,
			channelId: channelId || undefined,
			channelUsername: channelUsername || undefined,
			maxResults,
		});

		return NextResponse.json({
			error: null,
			success: true,
			data: videos,
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		return NextResponse.json(
			{
				error: errorMessage,
				success: false,
				data: null,
			},
			{ status: 500 },
		);
	}
}
