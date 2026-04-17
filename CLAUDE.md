# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev Server

Start the local server (runs on port 3000):

```bash
python3 -m http.server 3000
```

This is configured in `.claude/launch.json`. There is no build step, no package manager, and no dependencies to install.

## Architecture

This is a pure static HTML site — a single [`index.html`](index.html) with all CSS embedded inline. No frameworks, no JavaScript, no external stylesheets beyond Google Fonts.

Key design details:
- Typography: Lato 900 for the wordmark, Roboto Mono for body/footer text
- Fluid font sizing via `clamp()` (e.g. `clamp(2rem, 8vw, 5rem)`)
- Color scheme: `#f2f2f2` background, `#1a1a1a` text, `#666` muted text
- Layout: full-viewport flexbox centered container

The `.gitignore` includes patterns for Node/Next.js/Nuxt/Vite, anticipating a potential future framework migration.
