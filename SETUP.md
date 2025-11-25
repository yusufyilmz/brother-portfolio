# Setup Guide

This guide will help you get the portfolio website up and running with your brother's content.

## Quick Start Checklist

- [ ] Install dependencies
- [ ] Update site information
- [ ] Add project content
- [ ] Add media files
- [ ] Customize colors (optional)
- [ ] Test locally
- [ ] Deploy

## Detailed Setup Instructions

### 1. Install Dependencies

```bash
cd brother-portfolio
npm install
```

### 2. Update Site Information

Open `/config/siteCopy.ts` and update the following:

#### Site Metadata
```typescript
site: {
  name: "Your Brother's Name",
  artistName: "Your Brother's Name",
  domain: "example.com",
  baseUrl: "https://www.example.com",
  // ... rest of the metadata
}
```

#### Hero Section
```typescript
hero: {
  eyebrow: "Creative Director & Videographer",
  heading: "Your custom heading",
  subheading: "Your custom subheading",
  // ...
}
```

#### Contact Information
```typescript
contact: {
  email: "contact@example.com",
  social: {
    instagram: "https://www.instagram.com/username",
    youtube: "https://youtu.be/channelurl",
    // ...
  }
}
```

### 3. Add Projects

For each video project from the YouTube playlist:

1. Get the YouTube video URL
2. Create a thumbnail image (recommended: 1280x720px)
3. Add to `work.featured` array:

```typescript
{
  id: "unique-project-id",
  title: "Project Name",
  category: "Video Production", // or Cinematography, etc.
  description: "Brief description of the project and what you did",
  videoUrl: "https://youtu.be/VIDEO_ID",
  thumbnailUrl: "/media/project-1-thumb.jpg",
  year: "2025",
}
```

For photo projects:

```typescript
{
  id: "unique-photo-project-id",
  title: "Photo Series Name",
  category: "Photography",
  description: "Description of the photo series",
  images: [
    "/media/photo-1.jpg",
    "/media/photo-2.jpg",
    "/media/photo-3.jpg",
  ],
  thumbnailUrl: "/media/photo-series-thumb.jpg",
  year: "2024",
}
```

### 4. Prepare Media Files

#### Required Media Files

Place all media files in `/public/media/` directory:

**Essential Files:**
- Project thumbnails (1280x720px recommended)
- About page image/video
- Hero background video (optional, but recommended)

**For Photo Projects:**
- High-quality images (max 2000px width recommended for web)
- Use WebP format for best performance
- Or use JPG with quality 85-90

**Creating Thumbnails:**

For YouTube videos, you can:
1. Use YouTube's auto-generated thumbnails
2. Create custom thumbnails in Photoshop/Figma
3. Extract a frame from the video using video editing software

Recommended thumbnail specs:
- Resolution: 1280x720px (16:9 aspect ratio)
- Format: JPG or PNG
- File size: Under 200KB

### 5. About Section

Update the about section with bio and professional photo:

```typescript
about: {
  heading: "Your brother's tagline",
  body: [
    "First paragraph about background and experience...",
    "Second paragraph about approach and philosophy...",
  ],
  skills: [
    "Video Production",
    "Cinematography",
    // ... add relevant skills
  ],
  image: "/media/about.jpg", // Professional photo
  video: "/media/about-reel.mp4", // Optional: short video introduction
}
```

### 6. Test Locally

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` and check:

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Videos play properly
- [ ] Images display correctly
- [ ] Mobile responsiveness
- [ ] Contact links work
- [ ] Social media links work

### 7. Customize Theme (Optional)

If you want to change colors, edit `/config/themes.ts`:

```typescript
// Choose active theme
export const activeThemeId: ThemeId = "dark"; // or "light", "cinematic"
```

Or customize colors:
```typescript
colors: {
  background: "#0a0a0a",  // Main background
  surface: "#1a1a1a",     // Cards/surfaces
  accent: "#3b82f6",      // Primary accent
  accentSoft: "#60a5fa",  // Secondary accent
  ink: "#f5f5f5",         // Text color
  muted: "#a3a3a3",       // Muted text
}
```

### 8. Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All content is updated (no placeholder text)
- [ ] All images are optimized (compressed)
- [ ] All links work correctly
- [ ] Contact email is correct
- [ ] Social media links are correct
- [ ] Site metadata is updated
- [ ] Test on mobile devices
- [ ] Run `npm run build` to check for errors

### 9. Deploy to Vercel

1. Create a [Vercel](https://vercel.com) account
2. Install Vercel CLI or use web interface
3. Connect your Git repository
4. Vercel will auto-detect Next.js and deploy

**Using Vercel CLI:**
```bash
npm install -g vercel
vercel
```

**Using Vercel Dashboard:**
1. Go to vercel.com
2. Click "New Project"
3. Import your Git repository
4. Deploy (Vercel handles the rest)

### 10. Custom Domain (Optional)

If you have a custom domain:

1. Go to Vercel project settings
2. Add your domain
3. Update DNS records (Vercel provides instructions)
4. Update `baseUrl` in `siteCopy.ts`

## Tips for Best Results

### Video Content
- Keep videos under 10 minutes for web viewing
- Use YouTube for hosting (free, reliable, good player)
- Create engaging thumbnails (faces, action, contrast)
- Write compelling descriptions

### Photography
- Optimize images before uploading (use tools like TinyPNG)
- Maintain consistent aspect ratios in galleries
- Use high-quality images but web-optimized sizes
- Consider using WebP format for better compression

### Performance
- Optimize all images (use Next.js Image component)
- Keep video file sizes reasonable
- Test on slow connections
- Use lazy loading (already implemented)

### SEO
- Write descriptive project titles
- Add detailed descriptions
- Use relevant keywords naturally
- Keep metadata up to date

## Common Issues

### Images not showing
- Check file path (should be `/media/filename.ext`)
- Verify file is in `/public/media/` directory
- Check file permissions

### Videos not playing
- Verify YouTube URL is correct
- Check if video is public/unlisted (not private)
- Test URL in browser first

### Build errors
- Run `npm run type-check` to find TypeScript errors
- Check for missing required fields in `siteCopy.ts`
- Ensure all imports are correct

## Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Review this setup guide
3. Check the main README.md
4. Contact the development team

## Next Steps

After deployment:
- Share the URL with colleagues/clients
- Monitor analytics (can add Google Analytics)
- Update projects regularly
- Collect feedback and iterate

Good luck! 🚀

