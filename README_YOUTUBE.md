# YouTube Video Fetcher

This project includes utilities to fetch videos from a YouTube channel.

**Important:** `siteCopy.turkish.ts` is kept as a **curated, manual list** of featured works. The YouTube fetcher saves videos to a separate JSON file (`data/youtube-videos.json`) that can be used for dynamic content display.

## Setup

1. **Get a YouTube Data API v3 Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the YouTube Data API v3
   - Go to "Credentials" and create an API key
   - Copy your API key

2. **Set the API Key**:
   - Option 1: Set as environment variable:
     ```bash
     export YOUTUBE_API_KEY=your_api_key_here
     ```
   - Option 2: Create a `.env.local` file:
     ```
     YOUTUBE_API_KEY=your_api_key_here
     ```

## Usage

### Method 1: Using the Script (Recommended)

Run the script to fetch videos and automatically update `siteCopy.turkish.ts`:

```bash
# Using a video URL (will extract channel from video)
YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --video-url "https://youtu.be/VSm6psGvRwM"

# Using a channel URL
YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --channel-url "https://www.youtube.com/@username"

# Using a channel ID
YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --channel-id "UCxxxxx"

# Using a channel username
YOUTUBE_API_KEY=your_api_key npm run fetch-videos -- --channel-username "@username"

# Limit the number of videos fetched (default: 50)
npm run fetch-videos -- --video-url "https://youtu.be/VSm6psGvRwM" --max 20

# Save to a custom location
npm run fetch-videos -- --video-url "https://youtu.be/VSm6psGvRwM" --output "data/custom-videos.json"
```

The script will:
- Fetch videos from the YouTube channel
- Save them to `data/youtube-videos.json` (or custom path with `--output`)
- Display a summary of fetched videos in the console
- **NOT modify** `siteCopy.turkish.ts` (which remains a curated manual list)

### Method 2: Using the API Route

You can also fetch videos via the API route:

```bash
# Using a video URL
curl "http://localhost:3000/api/youtube-videos?apiKey=YOUR_KEY&videoUrl=https://youtu.be/VSm6psGvRwM"

# Using a channel URL
curl "http://localhost:3000/api/youtube-videos?apiKey=YOUR_KEY&channelUrl=https://www.youtube.com/@username"

# Limit results
curl "http://localhost:3000/api/youtube-videos?apiKey=YOUR_KEY&videoUrl=https://youtu.be/VSm6psGvRwM&maxResults=20"
```

Or use it in your code:

```typescript
const response = await fetch(
  `/api/youtube-videos?videoUrl=https://youtu.be/VSm6psGvRwM&maxResults=20`
);
const { data: videos } = await response.json();
```

## Supported URL Formats

The fetcher supports various YouTube URL formats:

- **Video URLs**:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

- **Channel URLs**:
  - `https://www.youtube.com/@username`
  - `https://www.youtube.com/channel/CHANNEL_ID`
  - `https://www.youtube.com/c/username`
  - `https://www.youtube.com/user/username`

## Output Format

Videos are saved to `data/youtube-videos.json` with the following structure:

```json
{
  "fetchedAt": "2025-01-XX...",
  "totalVideos": 20,
  "videos": [
    {
      "id": "youtube-1",
      "title": "Video Title",
      "category": "Video Prodüksiyonu",
      "description": "Video description...",
      "videoUrl": "https://www.youtube.com/watch?v=...",
      "thumbnailUrl": "https://...",
      "year": "2025",
      "publishedAt": "2025-01-XX..."
    }
  ]
}
```

## Usage in Your App

You can use the fetched videos in two ways:

1. **Read from JSON file** (for static/SSG):
   ```typescript
   import youtubeVideos from '@/data/youtube-videos.json';
   ```

2. **Use the API route** (for dynamic/ISR):
   ```typescript
   const response = await fetch('/api/youtube-videos?videoUrl=...');
   const { data: videos } = await response.json();
   ```

3. **Keep siteCopy separate** for curated featured works that you manually select.

## Notes

- The YouTube Data API has quota limits. Each request consumes quota units.
- The script fetches up to 50 videos by default (API limit per page).
- Videos are sorted by publication date (newest first).
- The script automatically handles pagination to fetch all videos up to the `maxResults` limit.

