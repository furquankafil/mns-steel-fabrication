document.addEventListener("DOMContentLoaded", function () {
  // Photo lightbox (existing)
  const items = Array.from(document.querySelectorAll(".gal-item"));
  if (items.length) {
    const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap");
    let visible = items, idx = 0;
    function show(i) {
      idx = (i + visible.length) % visible.length;
      const it = visible[idx];
      lbImg.src = it.dataset.full || it.querySelector("img").src;
      lbImg.alt = it.querySelector("img").alt;
      lbCap.textContent = it.querySelector("img").alt;
    }
    document.querySelectorAll(".filters[data-photo-filters] button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filters[data-photo-filters] button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        const f = b.dataset.filter;
        items.forEach(function (it) { it.classList.toggle("hidden", f !== "all" && it.dataset.cat !== f); });
        visible = items.filter(function (it) { return !it.classList.contains("hidden"); });
      });
    });
    items.forEach(function (it) { it.addEventListener("click", function () { visible = items.filter(function (x) { return !x.classList.contains("hidden"); }); show(visible.indexOf(it)); lb.classList.add("open"); document.body.style.overflow = "hidden"; }); });
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    document.getElementById("lbClose").addEventListener("click", close);
    document.getElementById("lbPrev").addEventListener("click", function () { show(idx - 1); });
    document.getElementById("lbNext").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }
  // Video filtering
  const vcards = Array.from(document.querySelectorAll(".vid-card"));
  const vids = Array.from(document.querySelectorAll(".vid-card video"));
  if (vcards.length) {
    document.querySelectorAll(".filters[data-video-filters] button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filters[data-video-filters] button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        const f = b.dataset.vfilter;
        let n = 0;
        vcards.forEach(function (it) {
          const v = it.querySelector("video");
          const show = f === "all" || it.dataset.vcat === f || (it.dataset.vcat||"").split(" ").includes(f);
          it.style.display = show ? "" : "none";
          if (!show && v && !v.paused) v.pause();
          if (show) n++;
        });
        const c = document.getElementById("videoCount");
        if (c) c.textContent = n + " PROJECT VIDEOS VISIBLE";
      });
    });
    vcards.forEach(function (card) {
      const body = card.querySelector(".vid-body");
      const title = body ? body.querySelector("b") : null;
      const text = title ? title.textContent : "MNS Steel Fabrication project";
      if (body && !body.querySelector(".vid-wa")) {
        const a = document.createElement("a");
        a.className = "btn btn-wa vid-wa";
        a.href = "#";
        a.setAttribute("data-wa", "");
        a.setAttribute("data-wa-service", "General");
        a.setAttribute("data-wa-message", "Hello MNS Steel Fabrication, I viewed \"" + text + "\" in your project videos and would like to enquire about a similar fabrication project.");
        a.textContent = "Enquire on WhatsApp";
        body.appendChild(a);
      }
      if (body && body.children.length > 1) body.children[1].classList.add("vid-cat");
    });
    vids.forEach(function (v) {
      v.addEventListener("loadedmetadata", function () {
        const media = v.closest(".vid-media");
        if (!media || !v.videoWidth) return;
        const portrait = v.videoHeight >= v.videoWidth;
        media.classList.toggle("is-portrait", portrait);
        media.classList.toggle("is-landscape", !portrait);
      });
      v.addEventListener("play", function () { vids.forEach(function (o) { if (o !== v && !o.paused) o.pause(); }); if (v.preload === "none") v.preload = "metadata"; });
      v.addEventListener("error", function () { v.closest(".vid-card")?.classList.add("vid-missing"); }, true);
    });
    vids.forEach(function (v) { if (!v.getAttribute("preload") || v.preload === "none") v.preload = "metadata"; });
    if ("IntersectionObserver" in window) {
      const near = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          const v = en.target;
          if (en.isIntersecting) { if (v.preload === "none") v.preload = "metadata"; }
          else if (!v.paused) v.pause();
        });
      }, { rootMargin: "400px 0px" });
      vids.forEach(function (v) { near.observe(v); });
    }
  }
});
