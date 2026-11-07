# MNS Steel Fabrication — Premium White & Gold Website

Complete redesign: bright, elegant, white-and-gold luxury architectural theme. Six pages, one design system (HTML5 + CSS3 + Vanilla JS + GSAP). No backend, no build step.

## Pages
- `index.html` — Split cinematic hero (dedicated desktop/mobile videos), introduction, 6 capability cards, sheds & structural solutions, featured work (real photos), why MNS, process, brand statement, FAQ, final CTA
- `about.html` — Company introduction, expertise, residential/commercial/industrial, workmanship, quality
- `services.html` — 6 detailed services (intro, applications, considerations, per-service WhatsApp)
- `gallery.html` — 12 real photographs, masonry layout, 7 category filters, lightbox (prev/next/Esc)
- `contact.html` — Business cards, embedded map (28.5461311, 77.3027496), WhatsApp enquiry form with validation
- `consultation.html` — Structured consultation form (location, budget, dimensions, method) → WhatsApp

## Hero Video
- Desktop: `assets/videos/hero-desktop.mp4` (copy of `hero video banner desktop.mp4`)
- Mobile: `assets/videos/hero-mobile.mp4` (copy of `hero video banner mobail.mp4`)
- `js/main.js` swaps source on `(max-width:820px)` matchMedia + orientation change. Poster: `hero-poster.jpg` (desktop), `gate-panel.jpg` (mobile).

## Photography (originals preserved)
Real client photos copied to clean names under `assets/images/`: `shed-interior`, `elevator-glass`, `gate-panel`, `elevator-frame`, `gate-ornate`, `steel-frame-building`, `shed-spiral`, `shed-blue`, `external-stair`, `fire-stair`, `hero-poster`, `logo-mns`. Originals untouched. No stock, no video frames. The two `INDUSTRIAL SHED MANUFACTURERS` graphics in assets were excluded from premium sections (baked-in text).

## WhatsApp
Central `js/whatsapp.js`: `openWhatsApp(service, message)` → `https://wa.me/918860307274?text=...` URL-encoded. Exact per-service messages as per brief. Forms validate (Indian mobile, email) then open WhatsApp pre-filled — visitor presses Send.

## SEO
Unique titles/descriptions, canonicals, OG/Twitter, semantic HTML, alt text, `sitemap.xml`, `robots.txt`, LocalBusiness JSON-LD (C-257, Okhla, New Delhi 110025). No fake reviews, hours, or claims.

## Verified (Playwright, local server)
- 6 pages × desktop 1440 / mobile 390: navigation, active links, drawer, no horizontal overflow, no broken images (lazy below-fold noted)
- Desktop hero plays `hero-desktop.mp4`; mobile loads `hero-mobile.mp4`
- Gallery filters + lightbox; WhatsApp URL encoding confirmed; form validation present
