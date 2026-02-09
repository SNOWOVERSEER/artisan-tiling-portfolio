# Simon Master Construction

A premium construction company website built with modern web technologies. Features a bilingual interface (English/Chinese) with smooth animations and a luxury dark theme.

## Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **shadcn/ui** - Radix-based component library
- **Framer Motion** - React animation library
- **Anime.js** - JavaScript animation engine
- **Lucide React** - Icon library

## Features

- Bilingual support (English / Chinese) with instant switching
- Responsive design for mobile, tablet, and desktop
- Smooth scroll-triggered animations
- Interactive project portfolio with filtering
- Testimonials carousel
- Dark luxury theme with gold accent palette

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:8080`.

## Project Structure

```
src/
  components/
    layout/       # Navbar
    sections/     # Page sections (Hero, About, Services, etc.)
    ui/           # shadcn/ui components
  contexts/       # React context providers (Language)
  hooks/          # Custom hooks
  i18n/           # Translation files (en, zh)
  lib/            # Utility functions
  pages/          # Route pages
public/
  images/         # Static images
```

## License

All rights reserved.
