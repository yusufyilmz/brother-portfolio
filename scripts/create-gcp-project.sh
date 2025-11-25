#!/bin/bash
# Script to create a Google Cloud Project and get the project ID

set -e

PROJECT_NAME="${1:-devhub-showcase}"
PROJECT_ID="${2:-}"

echo "🚀 Creating Google Cloud Project..."
echo "   Project Name: $PROJECT_NAME"

# If project ID is not provided, generate one
if [ -z "$PROJECT_ID" ]; then
    # Generate a unique project ID (lowercase, alphanumeric, hyphens only)
    PROJECT_ID="${PROJECT_NAME}-$(date +%s | tail -c 6)"
    PROJECT_ID=$(echo "$PROJECT_ID" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g')
    echo "   Generated Project ID: $PROJECT_ID"
else
    echo "   Using provided Project ID: $PROJECT_ID"
fi

# Create the project
echo ""
echo "📦 Creating project..."
gcloud projects create "$PROJECT_ID" --name="$PROJECT_NAME" || {
    echo "⚠️  Project might already exist or there was an error"
    echo "   Trying to get existing project info..."
}

# Set as current project
echo ""
echo "🔧 Setting as current project..."
gcloud config set project "$PROJECT_ID"

# Get the project number (different from project ID)
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")

echo ""
echo "✅ Project created successfully!"
echo ""
echo "📋 Project Details:"
echo "   Project Name: $PROJECT_NAME"
echo "   Project ID: $PROJECT_ID"
echo "   Project Number: $PROJECT_NUMBER"
echo ""
echo "🔗 Useful Links:"
echo "   Console: https://console.cloud.google.com/home/dashboard?project=$PROJECT_ID"
echo "   APIs: https://console.cloud.google.com/apis/library?project=$PROJECT_ID"
echo "   YouTube API: https://console.cloud.google.com/apis/api/youtube.googleapis.com/overview?project=$PROJECT_ID"
echo "   Credentials: https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo ""
echo "📝 Next Steps:"
echo "   1. Enable YouTube Data API v3:"
echo "      gcloud services enable youtube.googleapis.com --project=$PROJECT_ID"
echo ""
echo "   2. Or visit: https://console.cloud.google.com/apis/api/youtube.googleapis.com/overview?project=$PROJECT_ID"
echo ""
echo "   3. Create an API key:"
echo "      Visit: https://console.cloud.google.com/apis/credentials?project=$PROJECT_ID"
echo ""
echo "   4. Update .env.local with your new API key"
echo ""

# Save project ID to a file for reference
echo "$PROJECT_ID" > .gcp-project-id
echo "💾 Project ID saved to .gcp-project-id"

