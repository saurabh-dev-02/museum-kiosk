# Museum Kiosk

A touchscreen museum kiosk built with Next.js (App Router), TypeScript and Tailwind. Visitors tap through exhibits, and the kiosk returns to the home screen after a period of inactivity. The UI is designed at a fixed 1920x1080 and scales to fit any window. It ships as a fully static export.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
```

## Run

```bash
npm run dev        # development server at http://localhost:3000
npm run build      # static export to ./out
npx serve out      # preview the static build
npm run lint
```

## Content

All text and settings (idle timeout, warning seconds, design size) live in [`data/content.json`](data/content.json).

## How it works

- `components/ScaledStage.tsx`: renders the fixed 1920x1080 layout and scales it uniformly to fit the window, with black bars on the edges.
- `components/IdleTimeoutProvider.tsx`: any touch, click or key press resets the idle timer. The warning modal shows `warningSeconds` before the timeout. On `/` the timer only starts after the first touch.
- `components/TouchButton.tsx`: used for every button and link. It shows a pressed state and logs `{ eventName, timestamp }` to the console.
