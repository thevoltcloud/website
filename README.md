# Volt Website

Source for [voltcloud.ai](https://voltcloud.ai) — the Volt marketing site. Next.js
(App Router) + Tailwind, deployed on Vercel.

## Pages

Home · product pages (Spark, Forge, Vault) · pricing · security · compliance ·
customers · contact (lead form) · blog.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-checks)
npm run typecheck
```

## Content

Marketing facts (SKUs, pricing, taglines) live in [`lib/site.ts`](lib/site.ts) —
keep them in sync with the product. Brand colors are defined in
[`tailwind.config.ts`](tailwind.config.ts) (Volt yellow `#F7D000`, navy `#0A1929`).

## Lead capture

The contact form posts to [`/api/lead`](app/api/lead/route.ts). Set `HUBSPOT_TOKEN`
in the environment to forward leads to HubSpot; without it, leads are accepted and
logged so the form works in preview.

## Deploy

Vercel auto-detects Next.js. Point the project at this repo; production deploys on
push to `main`. Set `HUBSPOT_TOKEN` (and any analytics keys) as project env vars.

Apache-2.0 — see [LICENSE](LICENSE).
