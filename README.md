# Simon Master

A premium single-page marketing website for Simon Master, a tiling and flooring specialist based in Melbourne, Australia. Features a bilingual interface (English/Chinese), interactive service showcases, and a data-driven project portfolio.

## Tech Stack

- **Vite 7** - Build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first styling with tailwindcss-animate plugin
- **shadcn/ui** - Radix-based component library
- **Framer Motion** - Scroll-triggered, layout, and flip-card animations
- **Anime.js** - Counter animations, staggered reveals, particle effects
- **Lucide React** - Icon library
- **Embla Carousel** - Testimonials slider

## Features

- Bilingual support (English / Chinese) with instant switching and localStorage persistence
- Responsive design for mobile, tablet, and desktop
- Services section with residential/commercial flip-card toggle and staggered animations
- Expertise showcase with three-column tile-pattern layout and diagonal-wave reveal
- Data-driven portfolio with category filtering and multi-image gallery lightbox
- Testimonials carousel
- Smooth section dividers with gradient transitions and gold accent lines
- Dark luxury theme with gold/charcoal/silver palette

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
    layout/       # Navbar, SectionDivider
    sections/     # Page sections (Hero, About, Services, Expertise, Portfolio, Testimonials, Contact, Footer)
    ui/           # shadcn/ui components
  contexts/       # React context providers (Language)
  hooks/          # Custom hooks
  i18n/           # Translation files (en, zh)
  lib/            # Utility functions
  pages/          # Route pages
public/
  images/
    hero/         # Hero background
    about/        # About section imagery
    services/     # Service images (residential/ and commercial/ subdirs)
    portfolio/    # Data-driven project galleries (manifest.json + project folders)
```

## Portfolio

Portfolio projects are fully data-driven. To add a new project, create a folder under `public/images/portfolio/` with a `cover.jpg`, optional numbered detail photos, and an `info.json` file. Then add the folder name to `manifest.json`. No code changes required.

## License

All rights reserved.
