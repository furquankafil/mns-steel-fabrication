document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const onScroll = function () { if (navbar) navbar.classList.toggle("stuck", window.scrollY > 30); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  const drawer = document.getElementById("mobileDrawer"), scrim = document.getElementById("scrim");
  const open = function () { drawer.classList.add("open"); scrim.classList.add("show"); document.body.style.overflow = "hidden"; };
  const close = function () { drawer.classList.remove("open"); scrim.classList.remove("show"); document.body.style.overflow = ""; };
  document.getElementById("hamburger")?.addEventListener("click", open);
  document.getElementById("drawerClose")?.addEventListener("click", close);
  scrim?.addEventListener("click", close);
  drawer?.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });

  const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();
  const page = document.body.getAttribute("data-page");
  document.querySelectorAll(".nav-links a").forEach(function (a) { if (a.getAttribute("href") === page) a.classList.add("active"); });

  // Hero video — video only: autoplay muted + loop, responsive desktop/mobile source, sound toggle only
  const hero = document.getElementById("heroVideo");
  if (hero) {
    const mq = window.matchMedia("(max-width: 820px)");
    const toggle = document.getElementById("heroSoundToggle");
    const fallback = document.getElementById("heroPlayFallback");
    const sourceEl = document.getElementById("heroSrc");
    hero.muted = true;
    hero.defaultMuted = true;
    const syncToggle = function () {
      if (!toggle) return;
      const muted = hero.muted;
      toggle.classList.toggle("is-on", !muted);
      toggle.setAttribute("aria-pressed", String(!muted));
      toggle.setAttribute("aria-label", muted ? "Unmute video" : "Mute video");
      toggle.title = muted ? "Unmute video" : "Mute video";
    };
    const hideFallback = function () { if (fallback) fallback.hidden = true; };
    const showFallback = function () { if (fallback) fallback.hidden = false; };
    const tryPlay = function () {
      if (hero.paused) {
        const p = hero.play();
        if (p && p.catch) p.catch(function (err) { if (err && err.name !== "AbortError") showFallback(); });
      }
    };
    if (toggle) toggle.addEventListener("click", function () {
      hero.muted = !hero.muted;
      syncToggle();
      if (hero.paused) tryPlay();
    });
    hero.addEventListener("volumechange", syncToggle);
    const markReady = function () { hero.classList.add("is-ready"); hideFallback(); tryPlay(); };
    hero.addEventListener("canplay", markReady);
    hero.addEventListener("loadeddata", markReady);
    hero.addEventListener("playing", function () { hero.classList.add("is-ready"); hideFallback(); });
    if (hero.readyState >= 2) markReady();
    hero.addEventListener("error", showFallback, true);
    if (fallback) fallback.addEventListener("click", function () { hideFallback(); tryPlay(); });
    const apply = function () {
      const want = mq.matches ? hero.getAttribute("data-src-mobile") : hero.getAttribute("data-src-desktop");
      if (!want || hero.getAttribute("data-src") === want) return;
      const at = hero.currentTime || 0;
      const wasMuted = hero.muted;
      hero.setAttribute("data-src", want);
      if (sourceEl) sourceEl.src = want;
      hero.src = want;
      hero.load();
      hero.addEventListener("loadedmetadata", function () {
        try { if (at > 0 && isFinite(hero.duration) && at < hero.duration) hero.currentTime = at; } catch (e) {}
        hero.muted = wasMuted;
        syncToggle();
      }, { once: true });
    };
    syncToggle();
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply); else if (mq.addListener) mq.addListener(apply);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) tryPlay(); });
    tryPlay();
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else reveals.forEach(function (el) { el.classList.add("in"); });

  document.querySelectorAll(".faq summary").forEach(function (s) {
    s.addEventListener("click", function () { s.parentElement.toggleAttribute("open"); });
  });
});
