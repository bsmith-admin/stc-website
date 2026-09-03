# Software Technology Concepts — Website

Marketing website for Software Technology Concepts, LLC (STC) — IT consulting and Epicor ERP specialists for small and mid-size businesses.

## Structure

```
index.html          Home page
services.html        Services page
about.html            About page
contact.html          Contact page
assets/css/style.css  Shared stylesheet
assets/js/main.js     Mobile nav toggle + contact form placeholder handler
assets/img/           Logo, icon, and favicon (SVG + PNG)
```

Static site — no build step. Every page links to `assets/css/style.css` and `assets/js/main.js` with relative paths, so the whole folder can be uploaded as-is to any static host (GitHub Pages, GoDaddy hosting, Netlify, etc.).

The stylesheet is linked with a version query string (`style.css?v=5`) to avoid stale browser caches after a deploy. Bump that number in all four HTML files whenever `style.css` changes.

## Known placeholders

The following are draft/placeholder content and should be replaced with real information before this site is considered launch-ready:

- **Contact details are real**: email `info@sfttech.com`, phone `814.440.1577`, location shown as "Akron, OH 44333" (city/state only, no street address, since the office is currently a home address). Full mailing address to be added once a P.O. Box is set up.
- **Contact form** (contact.html) — markup only, no backend. Needs a form service (Formspree, Netlify Forms, etc.) or a real handler before it can receive messages

Services list (index.html, services.html) is grounded in the principal consultant's real Epicor/ERP/PLM/IT-leadership background — not a placeholder.

## Branding

Navy `#1B2A4A` and teal `#0891B2`, per STC's 2026 brand refresh. Logo assets live in `assets/img/`.

## Deploying

**GitHub Pages:** Settings → Pages → Deploy from branch → `master` / `/ (root)`. Site will be live at `https://<username>.github.io/<repo>/`.

**GoDaddy or other static hosting:** upload the contents of this folder to the site's web root.
