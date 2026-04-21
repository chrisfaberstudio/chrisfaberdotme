# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev Server

```bash
npm install        # first time only
npm run dev        # Next.js at localhost:3000

cd studio && npm install && npm run dev   # Sanity Studio at localhost:3333
```

No Python server. `serve.js` and `index.html` are legacy artifacts from before the Next.js scaffold — ignore them.

## Build & Deploy

```bash
npm run build      # produces out/ — the static export
npm run seed       # populate Sanity with placeholder content (needs .env.local)
```

GitHub Actions (`.github/workflows/deploy.yml`) runs `npm run build` on push to `main` and force-pushes the `out/` contents to the `deploy` branch. Hostinger Auto Deploy serves from that branch.

## Architecture

**Next.js 15 App Router with `output: 'export'`** — fully static. No server runtime at deploy time.

- `app/` — pages and layout (server components; data fetching at build time via Sanity client)
- `components/` — UI components; `LocationPill` is the only client component (`'use client'`)
- `lib/` — Sanity client, image URL builder, GROQ queries, TypeScript types, location hook
- `studio/` — standalone Sanity Studio v3 (separate `package.json`, React 18, port 3333)
- `scripts/seed.ts` — run once to populate Sanity with placeholder content

## Design Tokens

All values come from `chrisfaber.studio` — see `docs/tokens.md` for the full extraction. Never hardcode hex values in components.

- Colors: `bg` (#f2f2f2) and `ink` (#1a1a1a) with Tailwind opacity modifiers (`ink/60`, etc.)
- Fonts: `font-mono` (Roboto Mono, body default), `font-display` (Lato 700, headings), `font-sans` (Inter, UI)
- No dark mode — light-only, matching the studio

## Key constraints

- `output: 'export'` means no API routes, no middleware, no runtime `cookies()`/`headers()`. All Sanity queries run at build time in async server components.
- `images: { unoptimized: true }` — Next.js image optimization is disabled; Sanity's CDN handles sizing via `urlFor().width().height().auto('format').url()`.
- `LocationPill` uses `useState('--:--')` as SSR placeholder and fills in the real time via `useEffect` to avoid hydration mismatches.
- The `deploy` branch is machine-managed by GitHub Actions — never commit to it manually.

## Environment Variables

Copy `.env.example` → `.env.local`. Required to run dev or build:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Required only for seeding:
- `SANITY_API_WRITE_TOKEN`
