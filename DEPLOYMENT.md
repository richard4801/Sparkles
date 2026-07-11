# Deployment (Vercel)

Sparklyn is a standard Next.js 16 app, so Vercel auto-detects and builds it with
**no configuration**. There is intentionally no `vercel.json` — adding one would
only override sensible defaults.

## Option A — connect the GitHub repo (recommended)

This gives you automatic production deploys on merge to `main`, plus a unique
preview URL for every pull request.

1. Go to <https://vercel.com/new> and sign in with GitHub.
2. **Import** the `richard4801/Sparkles` repository.
3. Vercel detects the framework as **Next.js**. Leave every field default:
   - Build command: `next build`
   - Output: handled automatically
   - Install command: `npm install`
   - Root directory: `./`
4. Click **Deploy**.

That's it. Vercel builds and gives you a `*.vercel.app` URL. After the first
deploy:
- Pushes to `main` → production deploy.
- Every PR (for example the Phase 1 PR) → its own preview deploy with a
  shareable URL, so you can review each phase live before merging.

## Option B — Vercel CLI (one-off deploy)

```bash
npm i -g vercel
vercel          # first run links the project and deploys a preview
vercel --prod   # promote to production
```

## Environment variables

None are required for Phase 1. Later phases will add secrets (set them under
**Project → Settings → Environment Variables** in Vercel, never in the repo):

| Variable | Phase | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_API_URL` | 4 | Base URL of the Laravel API |
| `PAYSTACK_SECRET_KEY` | 4 | Paystack server key |
| `FLUTTERWAVE_SECRET_KEY` | 4 | Flutterwave server key |

## Notes

- Remote images (`picsum.photos`, `i.pravatar.cc`) are already allowlisted in
  `next.config.ts` and are optimised by Vercel automatically. Swap them for the
  real asset CDN (Cloudflare R2 / S3) in Phase 4.
- The hero, newsletter and search forms point at routes (`/search`,
  `/api/subscribe`) that arrive in later phases; they are wired but not yet
  backed, which is expected for a Phase 1 deploy.
- Why not GitHub Pages: it is static-only and cannot run the search, auth,
  payment and API features the later phases require.
