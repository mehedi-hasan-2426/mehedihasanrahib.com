# mehedihasanrahib.com

Personal portfolio of Mehedi Hasan Rahib. A static site: one HTML page and one stylesheet, no build step and no JavaScript. It is deployed on Vercel, which also sends the security headers in `vercel.json`.

## Run locally

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open http://127.0.0.1:4173.

## Test

```powershell
npm ci
npx playwright install chromium
npm test
```

If the browser download is blocked, use an installed browser: `$env:PW_CHANNEL="msedge"; npm test`.

The tests check the heading, the project list, anchor navigation, horizontal overflow on desktop and phone, https links and the skip link.

## Content

Every project listed links to its public source. Fonts fall back to system fonts; no third-party fonts, images, analytics or trackers are loaded.
