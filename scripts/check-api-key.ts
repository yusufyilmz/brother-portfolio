#!/usr/bin/env tsx
/**
 * Script to check which project your YouTube API key belongs to
 * This helps identify the project ID associated with your API key
 */

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

const apiKey = process.env.YOUTUBE_API_KEY || process.argv[2];

if (!apiKey) {
	console.error(
		"Error: Please provide YOUTUBE_API_KEY as environment variable or argument",
	);
	console.error("Usage: npm run check-api-key");
	console.error("   or: YOUTUBE_API_KEY=your_key npm run check-api-key");
	process.exit(1);
}

async function checkApiKey() {
	console.log("Checking API key...\n");

	try {
		// Try a simple API call to see the project info
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=dQw4w9WgXcQ&key=${apiKey}`,
		);
		const data = await response.json();

		console.log(
			"	`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=dQw4w9WgXcQ&key=${apiKey}`",
		);
		if (data.error) {
			console.error("❌ API Key Error:");
			console.error(`   Message: ${data.error.message}`);

			if (data.error.errors && data.error.errors.length > 0) {
				console.error("\n   Error Details:");
				data.error.errors.forEach((err: any, index: number) => {
					console.error(`   ${index + 1}. ${err.message}`);
					if (err.domain) console.error(`      Domain: ${err.domain}`);
					if (err.reason) console.error(`      Reason: ${err.reason}`);
				});
			}

			// Extract project ID from error message if present
			const projectIdMatch = data.error.message.match(/project (\d+)/);
			if (projectIdMatch) {
				const projectId = projectIdMatch[1];
				console.error(`\n   📋 Project ID: ${projectId}`);
				console.error(
					`   🔗 Enable API: https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=${projectId}`,
				);
			}

			console.error("\n💡 To fix this:");
			console.error(
				"   1. Go to Google Cloud Console: https://console.cloud.google.com/",
			);
			console.error("   2. Select your project (or create a new one)");
			console.error("   3. Enable 'YouTube Data API v3'");
			console.error("   4. Make sure your API key is from that project");
		} else {
			console.log("✅ API Key is valid and working!");
			console.log("   The YouTube Data API v3 is enabled in your project.\n");
		}
	} catch (error) {
		console.error("Error checking API key:", error);
	}
}

checkApiKey();
