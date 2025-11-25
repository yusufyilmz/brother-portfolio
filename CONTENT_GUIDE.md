# Content Guide

This guide helps you extract and organize content from the YouTube videos to populate your portfolio.

## YouTube Playlist Overview

Based on the YouTube URL provided: `https://youtu.be/VSm6psGvRwM?si=jApYjIh-DVn_HrsZ`

### Steps to Extract Video Information

#### 1. Access the Playlist

1. Open the YouTube URL
2. If it's a playlist, you'll see all videos listed
3. If it's a single video, check the channel for more videos

#### 2. For Each Video, Collect:

**Required Information:**
- Video title
- Video URL (the individual video link)
- Category/type (e.g., "Commercial", "Music Video", "Short Film", "Documentary")
- Year produced
- Thumbnail image (can download from YouTube or create custom)

**Optional Information:**
- Client name (if applicable)
- Brief description (1-2 sentences about the project)
- Your role (Director, Cinematographer, Editor, etc.)
- Equipment used
- Location

#### 3. Download Thumbnails

**Option A: Use YouTube's Thumbnail**
```
https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
```
Replace VIDEO_ID with the ID from the URL.

**Option B: Create Custom Thumbnails**
- Use video editing software to export a frame
- Edit in Photoshop/Canva/Figma
- Recommended size: 1280x720px
- Save as JPG (quality 90)

#### 4. Organize Content Template

Create a spreadsheet or document with columns:

| Project ID | Title | Category | Description | Video URL | Thumbnail | Year | Client |
|------------|-------|----------|-------------|-----------|-----------|------|--------|
| project-1  | [Title] | Video Production | [Desc] | [URL] | [Filename] | 2025 | [Client] |

## Sample Project Entry

Here's how a completed project entry should look in `siteCopy.ts`:

```typescript
{
  id: "nike-commercial-2024",
  title: "Nike Summer Campaign",
  category: "Commercial",
  description: "A high-energy commercial showcasing Nike's summer collection. Directed, shot, and edited this 60-second spot featuring local athletes.",
  videoUrl: "https://youtu.be/VIDEO_ID",
  thumbnailUrl: "/media/nike-commercial-thumb.jpg",
  year: "2024",
}
```

## Category Suggestions

Based on typical video work, here are suggested categories:

- **Commercial** - Advertising work for brands
- **Music Video** - Music video production
- **Documentary** - Documentary films or segments
- **Corporate** - Corporate video content
- **Short Film** - Narrative short films
- **Event Coverage** - Event videography
- **Product Demo** - Product demonstration videos
- **Social Content** - Content for social media platforms
- **Cinematography Reel** - Compilation of cinematography work
- **Color Grading Reel** - Showcase of color grading work

## Writing Effective Descriptions

### Formula for Project Descriptions

**[What it is] + [Your role] + [Key achievement or unique element]**

Examples:

✅ Good:
> "A cinematic brand film for Tesla's Model Y launch. Served as director of photography, capturing the vehicle in diverse locations across Iceland using a mix of drone and gimbal work."

❌ Too short:
> "Video for Tesla."

❌ Too long:
> "This project was really exciting because we got to work with Tesla and they wanted us to create something special for their Model Y launch and we used a lot of different cameras and went to Iceland for three weeks and it was cold but we got amazing footage and the client loved it and..."

### Description Length Guidelines

- **Minimum**: 15 words
- **Ideal**: 25-40 words
- **Maximum**: 60 words

Keep it concise but informative.

## Photo Project Content

If you're adding photo projects, structure them like this:

```typescript
{
  id: "portraits-series-2024",
  title: "Urban Portraits",
  category: "Photography",
  description: "A portrait series capturing the diversity of urban life. Shot on location in downtown areas using natural light and minimal gear.",
  images: [
    "/media/portraits-1.jpg",
    "/media/portraits-2.jpg",
    "/media/portraits-3.jpg",
    "/media/portraits-4.jpg",
  ],
  thumbnailUrl: "/media/portraits-thumb.jpg",
  year: "2024",
}
```

### Photo Project Guidelines

- Include 3-8 images per project
- Images should tell a cohesive story
- Maintain consistent aspect ratio within a project
- Order images intentionally (best first, or narrative sequence)

## About Section Content

### Writing Your Bio

Your about section should include:

**Paragraph 1: Background**
- How you got into video/photography
- Years of experience
- Notable achievements or clients

**Paragraph 2: Approach**
- Your creative philosophy
- What drives your work
- What makes your work unique

**Example:**

```typescript
body: [
  "I've been creating visual content for over 8 years, working with brands like Nike, Tesla, and local music artists. Starting with a DSLR and a passion for storytelling, I've evolved into a full-service creative specializing in commercials, music videos, and branded content.",
  
  "My approach combines technical precision with authentic storytelling. I believe the best work comes from understanding not just what to show, but why it matters. Every frame should serve the story, and every project should connect with real people."
],
```

### Skills List

List 6-12 specific skills:

```typescript
skills: [
  "Video Production",
  "Cinematography", 
  "Color Grading",
  "Drone Operation",
  "Post Production",
  "Motion Graphics",
  "Sound Design",
  "Creative Direction",
]
```

## Contact Section

### Email
Use a professional email:
- firstname@lastname.com
- hello@yourname.com
- contact@yourname.com

### Social Media

Prioritize platforms where you're most active:
- Instagram (most important for visual creatives)
- YouTube (if you have a channel)
- Vimeo (alternative to YouTube)
- LinkedIn (for professional connections)

## Content Quality Checklist

Before finalizing content, check:

- [ ] All video URLs work and videos are public/unlisted
- [ ] Descriptions are spell-checked
- [ ] Categories are consistent across projects
- [ ] Years are accurate
- [ ] Project IDs are unique and URL-friendly (lowercase, hyphens)
- [ ] Thumbnails are high quality and properly sized
- [ ] About section tells a compelling story
- [ ] Contact information is current
- [ ] Social links go to the right profiles

## Getting Video IDs from URLs

YouTube URL formats and how to extract the video ID:

### Standard URL
```
https://www.youtube.com/watch?v=VSm6psGvRwM
                                  ^^^^^^^^^^^
                                  This is the ID
```

### Short URL
```
https://youtu.be/VSm6psGvRwM
                 ^^^^^^^^^^^
                 This is the ID
```

### Embedded URL
```
https://www.youtube.com/embed/VSm6psGvRwM
                              ^^^^^^^^^^^
                              This is the ID
```

For the portfolio, you can use any format, but short URLs are cleanest:
```typescript
videoUrl: "https://youtu.be/VSm6psGvRwM"
```

## Next Steps

1. Watch each video in the playlist
2. Fill out the content template spreadsheet
3. Download or create thumbnails
4. Write descriptions for each project
5. Transfer all information to `/config/siteCopy.ts`
6. Add media files to `/public/media/`
7. Test locally to ensure everything displays correctly

## Tips

- **Start with your best work** - Put your strongest projects first
- **Keep it current** - Focus on recent work (last 2-3 years)
- **Quality over quantity** - 8-12 strong projects is better than 30 mediocre ones
- **Update regularly** - Add new projects as you complete them
- **Get feedback** - Have others review your descriptions for clarity

Good luck building your portfolio! 🎬

