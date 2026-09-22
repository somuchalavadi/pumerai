# Pumerai Hotel Website Documentation

## Project

Location: `C:\Users\ASUS\Desktop\pumerai`

Brand: PUMERAI HOTEL

Stack:

- React
- JavaScript
- HTML
- CSS
- Three.js
- GSAP
- GSAP ScrollTrigger
- Vite

## Assets

The original scroll sequence remains in:

`C:\Users\ASUS\Desktop\pumerai\frames`

The site loads these files through the web path:

`/frames/pumerai_0001.webp` through `/frames/pumerai_0240.webp`

The files were not renamed or deleted. The production build copies them into `dist/frames` so Vercel can serve them.

## Main Features

- Canvas-rendered scroll sequence using exactly 240 frames.
- GSAP ScrollTrigger pinning and scrubbed frame progression.
- Loading state with progress.
- Static reduced-motion hero.
- Responsive header with smooth-scroll navigation.
- Actual Pumerai logo in the header and footer from `src/assets`.
- Home page contains Hero, About, Rooms, and Footer.
- Gallery and Contact are separate minimal Progressing pages.
- Reusable header/footer across every route.
- Vercel-ready `vercel.json`.

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Output folder: `dist`

## Account and Contact Notes

Email ID: ____________________________

Phone (Front Desk / Reservations): +91 98454 23223 or 08387-221221

Email Address: reservation@hotelpumerai.com

Password: ____________________________

GitHub: Google login - no separate password.

Vercel: Google login - no separate password.
