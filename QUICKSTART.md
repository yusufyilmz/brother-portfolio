# Quick Start Guide

Get your portfolio up and running in 15 minutes!

## 1. Install (2 minutes)

```bash
cd brother-portfolio
npm install
```

## 2. Update Basic Info (3 minutes)

Open `/config/siteCopy.ts` and update:

```typescript
site: {
  name: "Your Name",
  artistName: "Your Name",
  // ...
}

contact: {
  email: "your-email@example.com",
  social: {
    instagram: "https://instagram.com/yourhandle",
    youtube: "https://youtu.be/yourchannel",
  }
}
```

## 3. Add First Project (5 minutes)

In the same file, find `work.featured` and replace the placeholder:

```typescript
featured: [
  {
    id: "my-first-project",
    title: "My Project Name",
    category: "Video Production",
    description: "Brief description of what this project is about",
    videoUrl: "https://youtu.be/VSm6psGvRwM", // Your YouTube video
    thumbnailUrl: "/media/project-1-thumb.jpg", // We'll add this next
    year: "2025",
  }
]
```

## 4. Add a Thumbnail (2 minutes)

1. Download a thumbnail image for your project
2. Save it as `/public/media/project-1-thumb.jpg`
3. Recommended size: 1280x720px

Quick thumbnail tip: Right-click any YouTube video thumbnail and "Save image as..."

## 5. Test It! (1 minute)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 6. What's Next?

- ✅ You have a working portfolio!
- 📝 Add more projects (copy the format above)
- 🎨 Customize colors in `/config/themes.ts`
- 📝 Update the About page content
- 🚀 Deploy to Vercel (see README.md)

## Common First-Time Issues

**Can't see thumbnail image?**
- Make sure file is in `/public/media/` folder
- Check filename matches exactly (including extension)
- Refresh browser (Ctrl+F5 / Cmd+Shift+R)

**Video not showing?**
- Verify YouTube URL is correct
- Make sure video is public or unlisted (not private)
- Test URL in a regular browser tab first

**Port already in use?**
- Another app is using port 3000
- Try: `npm run dev -- -p 3001`
- Or close other running apps

## Need More Help?

- See `README.md` for full documentation
- See `SETUP.md` for detailed setup instructions
- See `CONTENT_GUIDE.md` for content tips

---

That's it! You're ready to build an amazing portfolio. 🎉

