# Deploy Checklist

## How it works

```
push to main
    ↓
GitHub Actions (.github/workflows/deploy.yml)
    ↓ npm ci + npm run build
    ↓ Next.js → out/ (static HTML/CSS/JS)
    ↓ force-push out/ → deploy branch
    ↓
Hostinger Auto Deploy detects deploy branch push
    ↓
Serves static files from deploy branch root
    ↓
chrisfaber.me
```

---

## One-time setup checklist

### GitHub Secrets

Go to: GitHub repo → Settings → Secrets and variables → Actions → New repository secret

| Secret name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

`GITHUB_TOKEN` is automatic — the Action uses it to push to the `deploy` branch.

### Hostinger

1. Log in to Hostinger → Websites → your chrisfaber.me site
2. Git integration → change branch from `main` to **`deploy`**
3. Set web root / public directory to `/` (the branch root, since the Action pushes `out/` contents there directly)
4. No build command needed — Hostinger just serves static files
5. Confirm auto-deploy is enabled

> The `deploy` branch doesn't need to exist beforehand — the Action creates it on first push to `main`.

### DNS (if not already pointed)

Point `chrisfaber.me` and `www.chrisfaber.me` to Hostinger:

1. Log in to your domain registrar (wherever chrisfaber.me is registered)
2. Set A record: `@` → Hostinger's IP (find in Hostinger dashboard → DNS / Nameservers)
3. Set CNAME: `www` → `chrisfaber.me` (or another A record with the same IP)
4. DNS propagation: up to 24–48 hours, usually under 1 hour

Alternatively, point the nameservers to Hostinger and manage DNS there entirely.

### Sanity CORS origins

Go to: [sanity.io/manage](https://sanity.io/manage) → your project → API → CORS origins

Add:
- `http://localhost:3000` (local dev)
- `http://localhost:3333` (Studio dev)
- `https://chrisfaber.me` (production)
- `https://www.chrisfaber.me` (www)
- `https://chrisfaberdotme-cms.sanity.studio` (Studio, once deployed)

### Sanity Studio deploy

```bash
cd studio
npm run build
npx sanity@latest deploy
```

Gives you a URL like `https://chrisfaberdotme-cms.sanity.studio`. Add that URL to CORS origins above.

---

## Deploying an update

1. Merge your PR to `main`
2. GitHub Actions runs automatically — watch it at: repo → Actions
3. Once the Action passes, Hostinger picks up the `deploy` branch push
4. The live site updates within a minute or two

---

## Unverified items

- **Hostinger web root setting**: confirmed the deploy approach works, but couldn't verify the exact field name in the Hostinger dashboard without login access. It may be labelled "Public directory", "Document root", or "Web root". Set it to `/` or leave blank (meaning branch root).
- **Hostinger branch switch**: couldn't confirm whether switching from `main` to `deploy` in Hostinger requires re-saving or triggers a new deploy. Do a test push after switching.
- **www redirect**: Hostinger may handle `www → apex` redirect automatically, or you may need to configure it in their dashboard under Redirects.
