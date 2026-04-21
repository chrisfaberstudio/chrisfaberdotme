# chrisfaber.me

Personal bio / linktree-style site. Sibling to [chrisfaber.studio](https://chrisfaber.studio).

**Stack:** Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS · Sanity CMS

---

## Local dev

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from the Sanity dashboard
- `NEXT_PUBLIC_SANITY_DATASET` — usually `production`
- `SANITY_API_WRITE_TOKEN` — only needed to run the seed script

### 3. Create a Sanity project

```bash
cd studio
cp .env.example .env
npx sanity@latest init --env
```

Follow the prompts: create a new project named `chrisfaberdotme-cms`, choose `production` as dataset, select **public**. Copy the project ID into both `.env.local` (root) and `studio/.env`.

### 4. Seed placeholder content

```bash
# Back in repo root
npm run seed
```

This uploads 9 images from Picsum and creates a `bioSettings` singleton plus 8 `galleryItem` documents. Safe to re-run (bioSettings uses `createOrReplace`; gallery items accumulate — delete extras in the Studio if needed).

### 5. Start the dev server

```bash
# Next.js at localhost:3000
npm run dev

# Sanity Studio at localhost:3333 (separate terminal)
cd studio && npm install && npm run dev
```

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `.env.local` + GitHub Secrets | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `.env.local` + GitHub Secrets | Dataset name (default: `production`) |
| `SANITY_API_WRITE_TOKEN` | `.env.local` only | Seed script only — never commit |
| `SANITY_STUDIO_PROJECT_ID` | `studio/.env` | Same project ID, for Studio |
| `SANITY_STUDIO_DATASET` | `studio/.env` | Same dataset, for Studio |

Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` as **repository secrets** in GitHub → Settings → Secrets and variables → Actions.

---

## How the Hostinger deploy works

Every push to `main` triggers `.github/workflows/deploy.yml`:

1. GitHub Actions installs dependencies and runs `npm run build`
2. Next.js exports a fully-static site to `out/`
3. The Action force-pushes the contents of `out/` to the `deploy` branch
4. Hostinger Auto Deploy detects the `deploy` branch push and serves the files

Hostinger requires **no build command** and **no Node runtime** — it just serves static files from the `deploy` branch root.

See `docs/deploy.md` for the full deploy checklist.

---

## Deploying the Studio

The Sanity Studio (`studio/`) is a standalone app. Deploy it separately to Sanity's managed hosting:

```bash
cd studio
npm run build
npx sanity@latest deploy
```

You'll get a URL like `https://chrisfaberdotme-cms.sanity.studio`. Add your production domain to Sanity CORS origins — see `docs/deploy.md`.

---

## Favicon

The brief asks for a favicon derived from the portrait. After uploading your real portrait in the Studio, download a square crop and convert it to `favicon.ico`, then place it at `app/favicon.ico`. Next.js will pick it up automatically.
