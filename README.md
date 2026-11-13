# MNS Steel Fabrication — Premium White & Gold Website

Complete redesign: bright, elegant, white-and-gold luxury architectural theme. Six pages, one design system (HTML5 + CSS3 + Vanilla JS + GSAP). No backend, no build step.

## Pages
- `index.html` — Video-only hero (dedicated desktop/mobile videos), Our Projects video showcase (directly below hero), introduction, 7 capability cards, sheds & structural solutions, featured work (real photos), why MNS, process, brand statement, FAQ, final CTA
- `about.html` — Company introduction, expertise, residential/commercial/industrial, workmanship, quality
- `services.html` — 7 detailed services (intro, applications, customisation options, considerations, per-service WhatsApp)
- `gallery.html` — 12 real photographs with category filters and lightbox, plus exactly six project videos with category filters
- `contact.html` — Business cards, embedded Google Map (C-257, Kalindi Kunj, New Delhi), Web3Forms enquiry form with validation
- `consultation.html` — Structured consultation form, submitted via Web3Forms to the business Gmail (mnssteelfabrication981@gmail.com)

## Project videos
Six original client videos in `assets/videos/` (`project-01` … `project-06`). The homepage Our Projects section and the Gallery page render the same six videos (responsive 3/2/1 column grid, native controls, `preload="metadata"`).

## Hero videos
- Desktop: `hero video banner desktop.mp4` (project root)
- Mobile: `hero video banner mobail.mp4` (project root)
- `js/main.js` swaps source on `(max-width:820px)` matchMedia + orientation change. Poster: `assets/images/hero-poster.jpg` (desktop), `assets/images/gate-panel.jpg` (mobile).

## Photography (originals preserved)
Real client photos under `assets/images/`: shed-interior, elevator-glass, gate-panel, elevator-frame, gate-ornate, steel-frame-building, shed-spiral, shed-blue, external-stair, fire-stair, hero-poster, logo-mns. No stock, no video frames.

## WhatsApp
Central `js/whatsapp.js` builds `https://wa.me/918860307274?text=...` URL-encoded links. Per-service enquiry messages.

## Forms
Contact and Consultation forms submit via Web3Forms (`https://api.web3forms.com/submit`) to the configured business Gmail inbox. Indian mobile + email validation, loading state, success only after a successful API response, error box with entered data retained on failure, form reset only after success.

## SEO & address
Unique titles/descriptions, canonicals (https://www.mnssteelfabrication.com/), OG/Twitter, semantic HTML, alt text, `sitemap.xml`, `robots.txt`, LocalBusiness JSON-LD (C-257, Kalindi Kunj, New Delhi — no PIN). No fake reviews, hours, or claims.
