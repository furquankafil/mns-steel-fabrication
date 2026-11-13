document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("consultation-form");
  if (!form) return;
  var submitBtn = document.getElementById("consultationSubmit");
  var successBox = document.getElementById("consultationSuccess");
  var errorBox = document.getElementById("consultationError");
  var isSubmitting = false;
  var TIMEOUT_MS = 15000;

  function normalizePhone(v) {
    return (v || "").replace(/[\s+\-()]/g, "").replace(/^91(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, "");
  }
  function fieldValid(f) {
    var v = (f.value || "").trim();
    var id = f.id;
    var ok = v.length > 0;
    if (ok && id === "name") ok = v.length >= 2;
    if (ok && id === "phone") ok = /^[6-9]\d{9}$/.test(normalizePhone(v));
    if (ok && id === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (ok && id === "message") ok = v.length >= 5;
    var field = f.closest(".field");
    if (field) field.classList.toggle("invalid", !ok);
    return ok;
  }
  function showBox(which) {
    var show = function (el, on) { if (el) el.hidden = !on; };
    show(successBox, which === "success");
    show(errorBox, which === "error");
    if (which) {
      var el = which === "success" ? successBox : errorBox;
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  function setLabel(text) {
    if (submitBtn) {
      var label = submitBtn.querySelector(".btn-label");
      if (label) label.textContent = text;
    }
  }
  function setLoading(on) {
    isSubmitting = on;
    if (submitBtn) {
      submitBtn.disabled = on;
      submitBtn.classList.toggle("is-loading", on);
      submitBtn.setAttribute("aria-disabled", String(on));
      setLabel(on ? "Sending..." : "SUBMIT CONSULTATION REQUEST");
    }
    form.querySelectorAll("input, select, textarea").forEach(function (el) { el.disabled = on; });
  }
  form.querySelectorAll("[required]").forEach(function (f) {
    f.addEventListener("blur", function () { fieldValid(f); });
    f.addEventListener("input", function () {
      var field = f.closest(".field");
      if (field && field.classList.contains("invalid")) fieldValid(f);
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (isSubmitting) return;
    showBox(null);
    var fields = Array.from(form.querySelectorAll("[required]"));
    var ok = fields.every(fieldValid);
    if (!ok) {
      var firstBad = fields.find(function (f) { var field = f.closest(".field"); return field && field.classList.contains("invalid"); });
      if (firstBad) firstBad.focus();
      return;
    }
    var formData = new FormData(form);
    var visitorEmail = (form.elements.email && form.elements.email.value || "").trim();
    if (visitorEmail && !formData.get("replyto")) formData.append("replyto", visitorEmail);
    formData.set("subject", "New Consultation Request — MNS Steel Fabrication");
    formData.set("access_key", "6a614dee-fe15-42b6-aa8e-0c50af958f6b");
    setLoading(true);
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      signal: controller.signal
    })
      .then(function (res) {
        return res.json().catch(function () { return null; }).then(function (data) {
          if (!res.ok || !data || data.success !== true) throw new Error("Submit failed");
          return data;
        });
      })
      .then(function () {
        clearTimeout(timer);
        showBox("success");
        form.reset();
        setLoading(false);
        setLabel("REQUEST SENT SUCCESSFULLY");
      })
      .catch(function (err) {
        clearTimeout(timer);
        if (err && err.name === "AbortError") { showBox("error"); setLoading(false); return; }
        showBox("error");
        setLoading(false);
      });
  });
});
