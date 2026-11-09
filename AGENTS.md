<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: Museum Kiosk

Touchscreen kiosk built with Next.js 16 (App Router), React 19, TypeScript and Tailwind v4. Visitors tap through exhibits, and the app resets itself when left idle.

### Layout

- `app/`: routes (`/` exhibit list, `/exhibits/[id]` detail)
- `components/`: `TouchButton`, `ScaledStage`, `IdleTimeoutProvider`, `TimeoutModal`
- `data/content.json`: all text and settings (challenge content plus `home` and `exhibitPage` design text)
- `data/content.ts`: typed access, `getExhibit()`, `formatMessage()`

### Rules

- **Static export only** (`output: "export"`). Do not use route handlers, server actions, `cookies()`/`headers()`, middleware or the default `next/image` loader. Use a plain `<img>` or CSS backgrounds.
- **Do not enable `cacheComponents` or `partialPrefetching`.** `next build` throws "PPR cannot be enabled in export mode". Dynamic routes must export `generateStaticParams()` and `dynamicParams = false`, and call `notFound()` for unknown params.
- `params` is a Promise. Type pages with the global `PageProps<"/exhibits/[id]">` and `await props.params`.
- **No hardcoded copy.** All user-visible text comes from `data/content.json` via `@/data/content`.
- **No UI component libraries.** Every interactive element uses `TouchButton`, which logs `{ eventName, timestamp }`.
- **Not responsive.** Design at a fixed 1920x1080 inside `ScaledStage`, using fixed px values (e.g. `w-[420px]`, `text-[48px]`). Do not use `sm:`/`md:`/`lg:` prefixes, `vw`/`vh`/`%` layout sizing or `clamp()`. Window resizing is handled only by uniform scaling with letterbox bars.
- Add `"use client"` only where needed (timers, scaling, buttons). Keep pages as Server Components.
- Before finishing a task, run `npm run lint` and `npm run build`, and both must pass.
