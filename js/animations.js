document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll(".hero [data-hero]").forEach(function (el, i) {
    gsap.fromTo(el, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.12 * i, ease: "power3.out", clearProps: "transform" });
  });
  gsap.utils.toArray(".svc, .why, .step, .work-item, .strip-item").forEach(function (el) {
    gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 92%", once: true } });
  });
  gsap.utils.toArray(".svc-media-col img, .fig img").forEach(function (img) {
    gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: img, start: "top 92%", once: true } });
  });
});
