# Creative Portfolio

A professional portfolio website for showcasing video production, cinematography, and photography work. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎨 Features

- **Responsive Design**: Fully responsive layout that looks great on all devices
- **Video Showcase**: Integrated YouTube player for displaying video work
- **Photo Galleries**: Beautiful image carousels for photography projects
- **Dark Theme**: Professional dark theme optimized for showcasing visual content
- **Fast Performance**: Built with Next.js 15 for optimal performance
- **SEO Optimized**: Proper meta tags and structured data for better search engine visibility
- **Type Safe**: Written in TypeScript for better developer experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd brother-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Configuration

### Site Content

All site content is centralized in `/config/siteCopy.ts`. Update this file to customize:

- Site metadata (title, description, keywords)
- Hero section content
- Work/project items
- About section information
- Contact information and social links

### Theme Customization

Themes are defined in `/config/themes.ts`. You can:

- Choose from predefined themes (dark, light, cinematic)
- Customize colors for each theme
- Create new theme variants
- Change the active theme by updating `activeThemeId`

### Adding Projects

To add a new project, edit `/config/siteCopy.ts` and add an entry to the `work.featured` array:

```typescript
{
  id: "project-id",
  title: "Project Title",
  category: "Video Production", // or "Cinematography", "Photography", etc.
  description: "Brief description of the project",
  videoUrl: "https://youtu.be/VIDEO_ID", // For video projects
  // OR
  images: [ // For photo projects
    "/media/photo-1.jpg",
    "/media/photo-2.jpg",
  ],
  thumbnailUrl: "/media/project-thumb.jpg",
  year: "2025",
}
```

### Adding Media Files

1. Place your media files in the `/public/media` directory
2. Reference them in `siteCopy.ts` using `/media/filename.ext`
3. For images, use formats like JPG, PNG, or WebP
4. For videos, use MP4 format for best compatibility

### YouTube Integration

For video projects:

1. Upload your video to YouTube
2. Copy the video URL (e.g., `https://youtu.be/VSm6psGvRwM`)
3. Add it to the project's `videoUrl` field in `siteCopy.ts`

The YouTube player will automatically embed and display your video with controls.

## 📂 Project Structure

```
brother-portfolio/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── work/                # Work listing and detail pages
│   │   └── [id]/           # Dynamic work detail page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── features/           # Feature components (VideoPlayer, Carousel)
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, FeaturedWork, etc.)
│   ├── ui/                 # UI components (Button, Card, Badge)
│   └── work/               # Work-specific components
├── config/                  # Configuration files
│   ├── siteCopy.ts         # Site content
│   └── themes.ts           # Theme definitions
├── lib/                     # Utility functions
├── public/                  # Static assets
│   └── media/              # Images and videos
└── package.json            # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run format` - Format code with Biome
- `npm run format:fix` - Format and fix code
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization Guide

### Changing Colors

Edit `/config/themes.ts` to modify the color scheme:

```typescript
colors: {
  background: "#0a0a0a",  // Main background color
  surface: "#1a1a1a",     // Card/surface background
  accent: "#3b82f6",      // Primary accent color
  accentSoft: "#60a5fa",  // Lighter accent variant
  ink: "#f5f5f5",         // Text color
  muted: "#a3a3a3",       // Muted/secondary text
}
```

### Changing Typography

The project uses system fonts by default. To change fonts:

1. Add custom fonts to `/app/layout.tsx`
2. Update the font family in `/tailwind.config.ts`

### Modifying Layout

- Header: `/components/layout/site-header.tsx`
- Footer: `/components/layout/site-footer.tsx`
- Navigation: Edit `navItems` array in `site-header.tsx`

## 📱 Social Media Integration

Update social media links in `/config/siteCopy.ts`:

```typescript
contact: {
  social: {
    instagram: "https://www.instagram.com/username",
    youtube: "https://youtube.com/@channel",
    vimeo: "https://vimeo.com/username",
    linkedin: "https://www.linkedin.com/in/username",
  }
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

Build command: `npm run build`
Output directory: `.next`

## 📄 License

This project is private and proprietary.

## 🤝 Support

For questions or issues, please reach out to the development team.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

