#!/usr/bin/env tsx
/**
 * Script to fetch YouTube videos and update siteCopy
 * 
 * Usage:
 *   YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --channel-url "https://www.youtube.com/@username"
 *   YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --video-url "https://youtu.be/VSm6psGvRwM"
 *   YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --channel-id "UCxxxxx"
 */

import { fetchYouTubeVideos } from "../utils/fetch-youtube-videos";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);

function getArgValue(arg: string): string | undefined {
	const index = args.indexOf(arg);
	if (index !== -1 && args[index + 1]) {
		return args[index + 1];
	}
	return undefined;
}

async function main() {
	const apiKey = process.env.YOUTUBE_API_KEY;
	if (!apiKey) {
		console.error("Error: YOUTUBE_API_KEY environment variable is required");
		console.error("Get your API key from: https://console.cloud.google.com/apis/credentials");
		process.exit(1);
	}
	
	const channelUrl = getArgValue("--channel-url");
	const videoUrl = getArgValue("--video-url");
	const channelId = getArgValue("--channel-id");
	const channelUsername = getArgValue("--channel-username");
	const maxResults = parseInt(getArgValue("--max") || "50", 10);
	
	if (!channelUrl && !videoUrl && !channelId && !channelUsername) {
		console.error("Error: Please provide one of:");
		console.error("  --channel-url <url>");
		console.error("  --video-url <url>");
		console.error("  --channel-id <id>");
		console.error("  --channel-username <username>");
		process.exit(1);
	}
	
	console.log("Fetching videos from YouTube...");
	
	try {
		const videos = await fetchYouTubeVideos({
			apiKey,
			channelUrl,
			videoUrl,
			channelId,
			channelUsername,
			maxResults,
		});
		
		console.log(`\n✅ Fetched ${videos.length} videos\n`);
		
		// Read current siteCopy file
		const siteCopyPath = join(process.cwd(), "config", "siteCopy.turkish.ts");
		let siteCopyContent = readFileSync(siteCopyPath, "utf-8");
		
		// Generate featured array from videos
		const featuredVideos = videos.slice(0, Math.min(videos.length, 20)).map((video, index) => {
			const year = new Date(video.publishedAt).getFullYear().toString();
			const description = video.description
				.substring(0, 150)
				.replace(/\n/g, " ")
				.trim();
			return {
				id: `project-${index + 1}`,
				title: video.title.replace(/"/g, '\\"'),
				category: "Video Prodüksiyonu",
				description: description + (video.description.length > 150 ? "..." : ""),
				videoUrl: video.videoUrl,
				thumbnailUrl: video.thumbnailUrl,
				year: year,
			};
		});
		
		// Create the featured array string in TypeScript format
		const featuredArrayLines = featuredVideos.map((video, index) => {
			const isLast = index === featuredVideos.length - 1;
			return `\t\t\t{\n\t\t\t\tid: "${video.id}",\n\t\t\t\ttitle: "${video.title}",\n\t\t\t\tcategory: "${video.category}",\n\t\t\t\tdescription: "${video.description}",\n\t\t\t\tvideoUrl: "${video.videoUrl}",\n\t\t\t\tthumbnailUrl: "${video.thumbnailUrl}",\n\t\t\t\tyear: "${video.year}",\n\t\t\t}${isLast ? "" : ","}`;
		});
		
		const featuredArrayString = `[\n${featuredArrayLines.join("\n")}\n\t\t]`;
		
		// Replace the featured array in siteCopy
		const featuredRegex = /featured:\s*\[[\s\S]*?\]/;
		if (featuredRegex.test(siteCopyContent)) {
			siteCopyContent = siteCopyContent.replace(
				featuredRegex,
				`featured: ${featuredArrayString}`,
			);
			
			writeFileSync(siteCopyPath, siteCopyContent, "utf-8");
			console.log("✅ Updated siteCopy.turkish.ts with fetched videos\n");
			console.log(`📝 Added ${featuredVideos.length} videos to the featured array\n`);
		} else {
			console.error("Could not find 'featured' array in siteCopy.turkish.ts");
		}
		
		// Also show all videos for reference
		console.log("📹 All fetched videos:\n");
		videos.forEach((video, index) => {
			console.log(`${index + 1}. ${video.title}`);
			console.log(`   ${video.videoUrl}`);
			console.log(`   Published: ${new Date(video.publishedAt).toLocaleDateString()}\n`);
		});
		
	} catch (error) {
		console.error("Error fetching videos:", error);
		process.exit(1);
	}
}

main();

