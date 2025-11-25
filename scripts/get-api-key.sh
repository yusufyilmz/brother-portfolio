#!/bin/bash
# Helper script to get API key creation instructions

PROJECT_ID=$(cat .gcp-project-id 2>/dev/null || echo "devhub-showcase-47048")

echo "🔑 To create an API key for project: $PROJECT_ID"
echo ""
echo "Option 1: Via Web Console (Recommended)"
echo "   1. Visit: https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo "   2. Click 'Create Credentials' → 'API Key'"
echo "   3. Copy the API key"
echo "   4. (Optional) Click 'Restrict Key' to add restrictions"
echo "   5. Update .env.local with: YOUTUBE_API_KEY=your_key_here"
echo ""
echo "Option 2: Via gcloud CLI (if available)"
echo "   gcloud alpha services api-keys create \\"
echo "     --display-name='brother-portfolio-youtube-key' \\"
echo "     --project=$PROJECT_ID"
echo ""
echo "📋 Project Details:"
echo "   Project ID: $PROJECT_ID"
echo "   YouTube API: Enabled ✅"
echo ""

