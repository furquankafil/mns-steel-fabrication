document.addEventListener("DOMContentLoaded", function () {
  function fieldValid(f) {
    const v = (f.value || "").trim();
    const id = f.id;
    let ok = v.length > 0;
    if (ok && (id === "phone" || id === "cPhone")) ok = /^[6-9]\d{9}$/.test(v.replace(/[\s+\-()]/g, "").replace(/^91/, ""));
    if (ok && (id === "email" || id === "cEmail")) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    f.closest(".field").classList.toggle("invalid", !ok);
    return ok;
  }
  document.querySelectorAll("form[data-wa-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fields = Array.from(form.querySelectorAll("[required]"));
      const ok = fields.every(fieldValid);
      if (!ok) { form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea")?.focus(); return; }
      const g = function (id) { return (form.querySelector("#" + id)?.value || "").trim(); };
      const lines = ["Hello MNS Steel Fabrication, I would like to request a consultation.", ""];
      if (g("name")) lines.push("Name: " + g("name"));
      if (g("phone")) lines.push("Phone: " + g("phone"));
      if (g("email")) lines.push("Email: " + g("email"));
      if (g("service")) lines.push("Service Required: " + g("service"));
      if (g("location")) lines.push("Project Location: " + g("location"));
      if (g("budget")) lines.push("Approximate Budget: " + g("budget"));
      if (g("dimensions")) lines.push("Project Dimensions: " + g("dimensions"));
      if (g("method")) lines.push("Preferred Contact Method: " + g("method"));
      if (g("message")) lines.push("", "Project Details: " + g("message"));
      lines.push("", "Please contact me to discuss my requirements.");
      window.open("https://wa.me/918860307274?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
    form.querySelectorAll("[required]").forEach(function (f) { f.addEventListener("blur", function () { fieldValid(f); }); });
  });
});
