# Software Technology Concepts — Website

Marketing website for Software Technology Concepts, LLC (STC) — IT consulting and Epicor ERP specialists for small and mid-size businesses.

## Structure

```
index.html          Home page
services.html        Services page
about.html            About page
contact.html          Contact page
booking.html          Dedicated booking page (embeds the Microsoft Bookings calendar)
assets/css/style.css  Shared stylesheet
assets/js/main.js     Mobile nav toggle + contact form submit handler
assets/img/           Logo, icon, favicon, and hero rotation photos
robots.txt            Search engine crawl rules
sitemap.xml           Page list for search engines
```

Static site — no build step. Every page links to `assets/css/style.css` and `assets/js/main.js` with relative paths, so the whole folder can be uploaded as-is to any static host (GitHub Pages, GoDaddy hosting, Netlify, etc.).

The stylesheet is linked with a version query string (`style.css?v=14`) to avoid stale browser caches after a deploy. Bump that number in all four HTML files whenever `style.css` changes.

## Known placeholders

The following are draft/placeholder content and should be replaced with real information before this site is considered launch-ready:

- **Contact details are real**: email `info@sfttech.com`, phone `814.440.1577`, location shown as "Akron, OH 44333" (city/state only, no street address, since the office is currently a home address). Full mailing address to be added once a P.O. Box is set up.
- **No custom domain yet** — site is live at `bsmith-admin.github.io/stc-website`. Worth pointing a real domain (e.g. sfttech.com, if owned) at it via GitHub Pages custom domain settings before a public relaunch.
- **No analytics** — no traffic tracking (Google Analytics or similar) is wired in, so visits/conversions from a relaunch push won't be measurable without adding one.
- **No privacy policy page** — worth adding now that the contact form collects names/emails and the site embeds Google Maps and Microsoft Bookings.
- **Social share image** — Open Graph/Twitter tags currently reuse `hero-1.jpg`. A dedicated 1200x630 branded image would look sharper when the site is shared in Slack, LinkedIn, or text messages.

Homepage hero images (`assets/img/hero-1.jpg` through `hero-7.jpg`) are real photos, resized/compressed on upload (max 1200px wide, ~quality 78) to keep page load fast. The hero graphic crossfades through all 7 in sync with 7 rotating news headlines (every 7 seconds). To add or change a headline/photo pair, add a `.hero-graphic-img` div and a matching `.news-item` span in `index.html`, same index order in both.

Services list (index.html, services.html) is grounded in the principal consultant's real Epicor/ERP/PLM/IT-leadership background — not a placeholder.

## Contact form

The contact form posts to Formspree (`https://formspree.io/f/xaeyjkrn`), which forwards submissions to `info@sfttech.com`. It includes a hidden honeypot field (`_gotcha`) to filter bots and submits via `fetch()` in `main.js` so the page shows a confirmation message instead of redirecting. Manage the form, view submissions, or adjust spam settings from the Formspree dashboard.

## Branding

Navy `#1B2A4A` and teal `#0891B2`, per STC's 2026 brand refresh. Logo assets live in `assets/img/`.

## Deploying

**GitHub Pages:** Settings → Pages → Deploy from branch → `master` / `/ (root)`. Site will be live at `https://<username>.github.io/<repo>/`.

**GoDaddy or other static hosting:** upload the contents of this folder to the site's web root.
