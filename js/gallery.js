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
  if (vcards.length) {
    document.querySelectorAll(".filters[data-video-filters] button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filters[data-video-filters] button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        const f = b.dataset.vfilter;
        let n = 0;
        vcards.forEach(function (it) {
          const show = f === "all" || it.dataset.vcat === f || (it.dataset.vcat||"").split(" ").includes(f);
          it.style.display = show ? "" : "none";
          if (show) n++;
        });
        const c = document.getElementById("videoCount");
        if (c) c.textContent = n + " PROJECT VIDEOS VISIBLE · 26 TOTAL";
      });
    });
  }
});
