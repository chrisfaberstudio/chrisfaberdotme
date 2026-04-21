# Design Tokens

Extracted from the live CSS bundle at `https://chrisfaber.studio/assets/index-C7PVViFv.css` on 2026-04-21. Every value in this project traces back to one of these tokens.

---

## Colors

The studio uses a two-token semantic system — no named palette, just `bg` and `ink` with opacity modifiers.

| Token | Hex | CSS / Tailwind usage |
|---|---|---|
| `bg` | `#f2f2f2` | `bg-bg`, `html { background-color }` |
| `ink` | `#1a1a1a` | `text-ink`, `border-ink` |
| `ink/80` | `#1a1a1acc` | Strong secondary text |
| `ink/70` | `#1a1a1ab3` | Body text, icon color |
| `ink/60` | `#1a1a1a99` | Muted text (role, captions) |
| `ink/50` | `#1a1a1a80` | Placeholder |
| `ink/40` | `#1a1a1a66` | Section labels |
| `ink/30` | `#1a1a1a4d` | Very muted |
| `ink/20` | `#1a1a1a33` | Border (medium) |
| `ink/10` | `#1a1a1a1a` | Border (subtle), portrait ring |

Defined in `tailwind.config.ts` as:
```ts
colors: {
  bg: 'rgb(242 242 242 / <alpha-value>)',
  ink: 'rgb(26 26 26 / <alpha-value>)',
}
```

Mirrored as CSS custom properties in `app/globals.css`:
```css
:root {
  --bg: #f2f2f2;
  --ink: #1a1a1a;
}
```

**No dark mode.** The studio has no `@media (prefers-color-scheme: dark)` and no `.dark` class. This site matches that decision.

---

## Typography

Google Fonts URL used by the studio:
```
Inter:wght@400;500 | Lato:wght@600 | Roboto Mono:wght@400;500
```

| Role | Family | Weight | Tailwind class | CSS var |
|---|---|---|---|---|
| Body / base | Roboto Mono | 400, 500 | `font-mono` | `--font-roboto-mono` |
| Display / wordmark | Lato | 700 | `font-display` | `--font-lato` |
| UI / sans | Inter | 400, 500 | `font-sans` | `--font-inter` |

> Note: the studio loads `Lato:wght@600` but Lato's available Google Fonts weights are 100/300/400/700/900. Browsers map 600 → 700. We load 700 explicitly.

The `html` element uses `Roboto Mono` as the default font — same as the studio.

### Type scale

| Class | Size | Used for |
|---|---|---|
| `text-[10px]` | 10px | Section labels, footer, location pill |
| `text-xs` | 0.75rem | Fine print |
| `text-sm` | 0.875rem | Body, social labels |
| `text-base` | 1rem | — |
| `text-[1.75rem]` | 1.75rem | Page heading (name) |

---

## Motion

| Use | Easing | Duration |
|---|---|---|
| Default transitions | `cubic-bezier(0.4, 0, 0.2, 1)` | `150ms` |
| Link hover | `cubic-bezier(0.4, 0, 0.2, 1)` | `200ms` |
| Hover effect | `opacity: 0.5–0.6` | — |
| Entrance animation | `cubic-bezier(0.4, 0, 0.2, 1)` | `500ms` |

The entrance animation (`fade-up`) is defined in `globals.css` and applied with staggered `animationDelay` inline styles (0ms → 320ms).

---

## Spacing

Standard Tailwind 4-unit rem scale. Key values used:

| Steps | rem | px |
|---|---|---|
| 1 | 0.25rem | 4px |
| 2 | 0.5rem | 8px | 
| 3 | 0.75rem | 12px |
| 4 | 1rem | 16px |
| 6 | 1.5rem | 24px |
| 8 | 2rem | 32px |
| 12 | 3rem | 48px |

Container: `max-w-[480px]`, defined as `max-w-container` in `tailwind.config.ts`.

---

## Borders

- Width: always `1px`
- Color: `ink/10` (subtle) or `ink/20` (medium)
- Radius: **none used by the studio** — buttons and pills are sharp-edged. This site adds `rounded-full` to the location pill only (a deliberate, minimal deviation).

---

## Layout

From the studio's Tailwind classes:
- `max-w-sm` (24rem / 384px) for narrow content
- `max-w-md` (28rem / 448px) for medium content  
- `max-w-2xl` (42rem / 672px) for wide content
- `px-6` (1.5rem) horizontal padding
- `py-12`/`py-24`/`py-32` vertical sections
