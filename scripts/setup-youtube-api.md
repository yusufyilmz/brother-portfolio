# Setting Up YouTube API for devhub-showcase Project

## Quick Steps

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Select or Create Project**
   - If "devhub-showcase" project exists, select it
   - If not, create a new project named "devhub-showcase"

3. **Enable YouTube Data API v3**
   - Go to: https://console.cloud.google.com/apis/library/youtube.googleapis.com
   - Make sure "devhub-showcase" project is selected
   - Click "Enable"

4. **Create API Key**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Make sure "devhub-showcase" project is selected
   - Click "Create Credentials" → "API Key"
   - Copy the API key

5. **Update .env.local**
   - Open `.env.local` in the project root
   - Replace `YOUTUBE_API_KEY` with your new API key from devhub-showcase project

6. **Test the Setup**
   ```bash
   npm run check-api-key
   ```

7. **Fetch Videos**
   ```bash
   npm run fetch-videos -- --video-url "https://youtu.be/VSm6psGvRwM"
   ```

## Direct Links for devhub-showcase Project

- **API Library**: https://console.cloud.google.com/apis/library?project=devhub-showcase
- **YouTube API**: https://console.cloud.google.com/apis/api/youtube.googleapis.com/overview?project=devhub-showcase
- **Credentials**: https://console.cloud.google.com/apis/credentials?project=devhub-showcase

## Note

The project ID is automatically associated with your API key. You don't need to set it separately - just make sure you're using an API key from the project you want (devhub-showcase).

