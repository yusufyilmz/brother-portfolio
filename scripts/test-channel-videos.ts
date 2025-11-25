#!/usr/bin/env tsx

import { getChannelVideosByHandle } from "../utils/fetchChannelVideos";

async function main() {
	const apiKey = process.env.YOUTUBE_API_KEY;
	if (!apiKey) {
		console.error("Missing YOUTUBE_API_KEY env var");
		process.exit(1);
	}

	const handle = "@EXEETYB";

	console.log("Fetching videos for handle:", handle);

	try {
		const videos = await getChannelVideosByHandle(handle, apiKey, 10);

		console.log(`Got ${videos.length} videos.`);
		videos.forEach((v, i) => {
			console.log(
				`${i + 1}. ${v.title} (${new Date(v.publishedAt).toLocaleDateString()})`,
			);
			console.log(`   ${v.url}`);
			console.log(`   thumb: ${v.thumbnailUrl}`);
		});
	} catch (err: any) {
		console.error("Error:", err.message || err);
	}
}

main();
