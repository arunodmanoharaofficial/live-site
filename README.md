# 🌐 Arunod Manohara · Personal Portfolio

A terminal-inspired personal portfolio built with **Next.js, React, and TypeScript**, with animated sections, social links, and contact information.

[Visit arunod.us](https://www.arunod.us) · [GitHub profile](https://github.com/arunodmanoharaofficial) · [Contact](mailto:contact@arunod.us)

## Preview

![Public website desktop preview, captured 17 October 2026](https://raw.githubusercontent.com/arunodmanoharaofficial/arunodmanoharaofficial/main/assets/previews/portfolio-20261017.jpg)

This is an actual capture of the public website on 17 October 2026. The deployed hero still shows a project card; the latest source replaces that card with a Cobe globe. The image documents the deployed site, not a verified deployment of the latest commit.

## What is included

- Home, About, Tech Stack, Playlist, Social, and Contact sections.
- A terminal-inspired interface with motion and visual effects.
- A globe component in the current source.
- CSS Modules for component styles.
- Static export configuration for static hosting.

## Technology

| Area | Tools |
| --- | --- |
| Framework | Next.js App Router, React |
| Language | TypeScript |
| Styling | CSS Modules and global CSS |
| Animation | Framer Motion |
| Globe | Cobe |

## Run locally

Use a Node.js version supported by the installed Next.js release and npm.

```bash
git clone https://github.com/arunodmanoharaofficial/live-site.git
cd live-site
npm ci
npm run dev
```

Open http://localhost:3000.

## Build for static hosting

```bash
npm run build
```

`next.config.mjs` sets `output: 'export'`, so the generated static site is written to `out/`. Publish that directory with your static hosting provider.

The existing `npm start` script invokes `next start`; use a static file server for the exported `out/` directory instead. The existing lint script invokes `next lint`; it needs updating for the current Next.js toolchain before it can be used as a validation gate.

## Source map

| Location | Purpose |
| --- | --- |
| `src/app/page.tsx` | Main page composition |
| `src/app/layout.tsx` | Root layout |
| `src/app/globals.css` | Global styling |
| `src/components/sections/` | Main content sections |
| `src/components/ui/` | Globe, terminal, and visual effects |
| `src/components/layout/` | Navigation and footer |
| `public/` | Static images, icons, and metadata files |

## Project work

This repository records the migration from Vite to Next.js, static export setup, font and scroll performance work, and the addition of an interactive globe.

A practical design decision is to keep reusable visual components separate from content sections. Static export supports hosting the generated portfolio without a persistent Next.js application server.

## Customization

Edit content in `src/components/sections/`, shared navigation in `src/components/layout/`, and public assets in `public/`. Review personal text, social links, and contact details before reusing the project.

## Validation note

This documentation update was checked against repository files and the public desktop page. A clean install/build, mobile layout, and production deployment of the latest source were not verified as part of this documentation change.
