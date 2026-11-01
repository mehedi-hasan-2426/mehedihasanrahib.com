# mehedihasanrahib.com

Personal portfolio of Mehedi Hasan Rahib. Built with Astro as a fully static site: no client-side JavaScript, no trackers, no third-party fonts or images. Deployed on Vercel, which sends the security headers in `vercel.json`.

## Run locally

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:4321. For the production build: `npm run build`, then `npm run preview` (http://127.0.0.1:4173).

Astro 6 is pinned because Astro 7 needs Node 22.23.4 or newer.

## Edit content

Projects and the timeline live in `src/data.ts`. Each project gets its own page under `/projects/<slug>`.

## Test

```powershell
npm run build
npx playwright install chromium
npm test
```

If the browser download is blocked, use an installed browser: `$env:PW_CHANNEL="msedge"; npm test`.

The tests cover the home page, project pages, the 404 page, horizontal overflow on desktop and phone, https links and the keyboard skip link.
