import { NextRequest, NextResponse } from "next/server";
import {
	getChannelDataByHandle,
	YouTubeChannelDetails,
	YouTubeVideo,
} from "@/utils/fetchChannelVideos";

type ChannelResponse = {
	channel: YouTubeChannelDetails;
	videos: YouTubeVideo[];
};

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const apiKey = searchParams.get("apiKey") || process.env.YOUTUBE_API_KEY;
	const handle = searchParams.get("handle");
	const maxResults = Number.parseInt(
		searchParams.get("maxResults") || "20",
		10,
	);

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

	if (!handle) {
		return NextResponse.json(
			{
				error: "Please provide a channel handle via the handle query param.",
				success: false,
				data: null,
			},
			{ status: 400 },
		);
	}

	try {
		const data = await getChannelDataByHandle(handle, apiKey, maxResults);

		return NextResponse.json<{
			error: string | null;
			success: boolean;
			data: ChannelResponse;
		}>({
			error: null,
			success: true,
			data,
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json(
			{
				error: message,
				success: false,
				data: null,
			},
			{ status: 500 },
		);
	}
}
