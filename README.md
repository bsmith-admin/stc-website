# Software Technology Concepts — Website

Marketing website for Software Technology Concepts, LLC (STC) — IT consulting and Epicor ERP specialists for small and mid-size businesses.

## Structure

```
index.html             Home page
services.html          Services page
about.html             About page
careers.html           Careers page: culture, open positions, application form
contact.html           Contact page
booking.html           Dedicated booking page (embeds the Microsoft Bookings calendar)
privacy.html           Privacy policy
assets/css/style.css   Shared stylesheet
assets/js/main.js      Mobile nav toggle, contact/careers form submit handler, open-positions loader
assets/img/            Logo, icon, favicon, and hero rotation photos
assets/data/positions.json  Open positions list (edit this file to add/remove a posting)
robots.txt             Search engine crawl rules
sitemap.xml            Page list for search engines
```

Static site — no build step. Every page links to `assets/css/style.css` and `assets/js/main.js` with relative paths, so the whole folder can be uploaded as-is to any static host (GitHub Pages, GoDaddy hosting, Netlify, etc.).

The stylesheet is linked with a version query string (`style.css?v=18`) to avoid stale browser caches after a deploy. Bump that number in all HTML files whenever `style.css` changes.

## Known placeholders

The following are draft/placeholder content and should be replaced with real information before this site is considered launch-ready:

- **Contact details are real**: email `info@sfttech.com`, phone `814.440.1577`, location shown as "Akron, OH 44333" (city/state only, no street address, since the office is currently a home address). Full mailing address to be added once a P.O. Box is set up.
- **Analytics wired in** — Google Analytics (GA4, `G-DPHN141MF4`) tag is in the `<head>` of all seven pages.
- **Social share image** — Open Graph/Twitter tags currently reuse `hero-1.jpg`. A dedicated 1200x630 branded image would look sharper when the site is shared in Slack, LinkedIn, or text messages.
- **Privacy policy is a plain-language draft** (`privacy.html`) — covers what's collected, third-party services used (Formspree, Microsoft Bookings, Google Maps), and how to request deletion. It says explicitly that it isn't legal advice; worth a lawyer's review given this is a real LLC handling client information.

## Launching at sfttech.com

`sfttech.com` is already registered and hosted through GoDaddy, currently showing an old placeholder site built with GoDaddy's Airo site builder. The plan is to replace that placeholder by uploading this site's files directly to the GoDaddy hosting account (see "GoDaddy or other static hosting" below), not by pointing DNS elsewhere. Since GoDaddy already owns the DNS for this domain, no DNS changes are needed, only replacing what's served at the existing hosting.

This repo stays on GitHub Pages at `bsmith-admin.github.io/stc-website` for previewing and testing changes before they go live on GoDaddy. Don't add a `CNAME` file to this repo, doing so makes GitHub Pages redirect the preview URL to `sfttech.com`, which breaks the preview since that domain doesn't point to GitHub Pages.

Homepage hero images (`assets/img/hero-1.jpg` through `hero-7.jpg`) are real photos, resized/compressed on upload (max 1200px wide, ~quality 78) to keep page load fast. The hero graphic crossfades through all 7 in sync with 7 rotating news headlines (every 7 seconds). To add or change a headline/photo pair, add a `.hero-graphic-img` div and a matching `.news-item` span in `index.html`, same index order in both.

Services list (index.html, services.html) is grounded in the principal consultant's real Epicor/ERP/PLM/IT-leadership background — not a placeholder.

## Contact form

The contact form posts to Formspree (`https://formspree.io/f/xaeyjkrn`), which forwards submissions to `info@sfttech.com`. It includes a hidden honeypot field (`_gotcha`) to filter bots and submits via `fetch()` in `main.js` so the page shows a confirmation message instead of redirecting. Manage the form, view submissions, or adjust spam settings from the Formspree dashboard.

## Careers page

`careers.html` posts to FormSubmit.co (`https://formsubmit.co/info@sfttech.com`), not Formspree. Formspree's free plan blocks file uploads entirely ("File Uploads Not Permitted"), and a resume upload is the whole point of this form, so it uses FormSubmit.co instead, which allows file uploads up to 10MB total per submission on its free tier with no plan upgrade needed.

This form does a normal browser POST/redirect rather than the `fetch()`-based AJAX flow the contact form uses: it deliberately does NOT have the `.contact-form` class, so `main.js`'s AJAX submit handler doesn't attach to it (FormSubmit's AJAX endpoint can't reliably carry file attachments). On submit, the browser posts directly to FormSubmit and FormSubmit redirects to the page set in the hidden `_next` field, `careers-thank-you.html` — a small branded confirmation page (not linked from nav/footer, not in `sitemap.xml`, marked `noindex` since it's only reachable after submitting).

Other FormSubmit-specific hidden fields on this form: `_subject` (email subject line), `_template` (`table`, for a cleaner email layout), and a honeypot named `_honey` (FormSubmit's convention — note this differs from the contact form's Formspree-style `_gotcha`).

**One-time setup step:** the first submission after this goes live triggers a confirmation email from FormSubmit to `info@sfttech.com`. Someone with access to that inbox has to click the confirmation link in it, or submissions before that point are held, not delivered (they aren't lost, but they won't show up in email until confirmed).

It collects name, email, phone, position applying for, years of experience, current title and employer, areas of expertise, earliest start date, salary expectations, a resume upload, optional additional document uploads (cover letter, portfolio, certifications — multiple files, any file type), and an open text field.

**Open positions** live in `assets/data/positions.json`, loaded client-side by `main.js`. Each entry needs `id`, `title`, `location`, `type`, and `summary`; it's rendered both as a card above the form and as an option in the "Position applying for" dropdown. The application form is hidden until a visitor clicks a card's "Apply for this role" button, which reveals the form, pre-selects that position in the dropdown, shows an "Applying for: X" chip above the form, and scrolls down to it. The form is hidden by `main.js` rather than in the HTML, so visitors without JavaScript still see it, and if `positions.json` fails to load the form is shown anyway so no one is locked out. To add a real opening, add an entry to `positions.json` — no HTML or JS changes needed. There's currently one entry, "General Application."

**Not yet done:** JobPosting structured data (would help individual roles show up richer in Google search) isn't wired in, since positions load client-side via JS rather than being present in the page's initial HTML. Worth revisiting if/when there are multiple real openings. `privacy.html` also doesn't yet mention the careers form's data collection (resume/document uploads) — update it before this page goes live.

## Branding

Navy `#1B2A4A` and teal `#0891B2`, per STC's 2026 brand refresh. Logo assets live in `assets/img/`.

## Deploying

**GitHub Pages (preview/staging):** Settings → Pages → Deploy from branch → `master` / `/ (root)`. Live at `https://bsmith-admin.github.io/stc-website/`. Used for testing changes before they go live.

**GoDaddy (production, sfttech.com):** upload the contents of this folder to the GoDaddy hosting account's web root, replacing the current placeholder site. This is the actual launch target.
