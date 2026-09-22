# Pumerai Hotel

A React/Vite luxury hotel website for PUMERAI HOTEL, built around a cinematic 240-frame scroll-linked WebP sequence.

## Structure

- `/` renders the Home page with Hero, About, Rooms, and Footer.
- `/gallery` renders a minimal Progressing page and Footer.
- `/contact` renders a minimal Progressing page and Footer.
- Header and Footer use the supplied Pumerai logo asset from `src/assets`.

## Run locally

```bash
npm install
npm run dev
```

The development server serves the existing `frames` directory at `/frames/...` without renaming or moving the original files.

## Build

```bash
npm run build
```

The Vite build copies the existing WebP frames into `dist/frames` so the production site and Vercel deployment can load `/frames/pumerai_0001.webp` through `/frames/pumerai_0240.webp`.

## Deployment

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Vercel config: `vercel.json`, including SPA rewrites for direct `/gallery` and `/contact` visits.

## Account and Contact Notes

Email ID: ____________________________

Phone (Front Desk / Reservations): +91 98454 23223 or 08387-221221

Email Address: reservation@hotelpumerai.com

Password: ____________________________

GitHub: Google login - no separate password.

Vercel: Google login - no separate password.
