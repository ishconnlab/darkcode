# Dark Code

A premium, futuristic landing page and educational platform for the Dark Code community — an all-in-one platform for mastering programming, building developer skills, and launching tech careers.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — type safety
- **Vite 8** — build tool
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — animations
- **Lucide React** — icons
- **React Router DOM** — client-side routing

## Features

- **Interactive Hero** — Live code terminal with cycling snippets, animated mesh gradient blobs, particle canvas background
- **Tech Stack Showcase** — hover tooltips with usage descriptions for each technology
- **Pillars** — Learn / Practice / Career section grids with 3D TiltCard hover effect
- **Testimonials** — auto-scrolling carousel with pause-on-hover
- **Blog** — category filter tabs (Python, JS, Web Dev, DevOps, AI/ML, Database, Career Tips, News)
- **Interactive Quiz** — 5 categories, 25 questions, 30-second timer, results with grade/score/XP
- **Collections** — premium resource cards
- **About Page** (`/about`) — mission, core values, team, impact stats with animated counters
- **Responsive** — mobile-first, works on all screen sizes
- **Live Learner Counter** — animated learner badge in hero
- **Scroll Progress Bar** — gradient progress indicator at page top
- **WhatsApp Integration** — instant messaging CTA

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── DarkCodeHome.tsx   — main landing page (~1400 lines)
│   └── AboutPage.tsx       — standalone about page
├── App.tsx                 — routing setup
├── index.css               — Tailwind v4 config + custom utilities/animations
└── main.tsx                — entry point
```

## Config Files

- `.gitignore` — standard Vite/Node ignores
- `eslint.config.js` — ESLint configuration
- `tsconfig.json` — TypeScript project references
- `tsconfig.app.json` — app-specific TypeScript config
- `tsconfig.node.json` — Node/Vite TypeScript config
- `vite.config.ts` — Vite config with React + Tailwind plugins
- `package.json` — dependencies and scripts
- `index.html` — HTML entry point with Inter font

## Brand Colors

| Token     | Hex       |
|-----------|-----------|
| Primary   | `#6C63FF` |
| Secondary | `#00D4FF` |
| Accent    | `#7C3AED` |
| BG        | `#0A0A0F` |
| Muted     | `#A1A1AA` |

## License

MIT © Dark Code
