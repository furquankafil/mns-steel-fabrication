const WHATSAPP_NUMBER = "918860307274";
const WA_MESSAGES = {
  "Steel Structures": "Hello MNS Steel Fabrication, I am interested in your Steel Structures service. I would like to discuss my project requirements and request a quotation.",
  "Gates & Grills": "Hello MNS Steel Fabrication, I am looking for custom Gates & Grills. I would like to discuss the design and pricing.",
  "Sheds & Canopies": "Hello MNS Steel Fabrication, I am interested in Car Parking Sheds / Sheds & Canopies. I would like to discuss my project requirements.",
  "Staircases": "Hello MNS Steel Fabrication, I need a custom metal Staircase. I would like to discuss design and fabrication requirements.",
  "Balcony Railings": "Hello MNS Steel Fabrication, I am interested in Balcony Railings. Please contact me to discuss the design and requirements.",
  "Custom Fabrication": "Hello MNS Steel Fabrication, I have a Custom Fabrication requirement. I would like to discuss my project and request details.",
  "Elevator & Lift Fabrication": "Hello MNS Steel Fabrication, I am interested in your Elevator & Lift Fabrication service. I would like to discuss my project requirements. Please contact me with more details.",
  "General": "Hello MNS Steel Fabrication, I would like to enquire about your steel fabrication services. Please share more details."
};
function openWhatsApp(serviceName, customMessage) {
  serviceName = (serviceName || "General").trim();
  let message = (customMessage || "").trim();
  if (!message) message = WA_MESSAGES[serviceName] || ("Hello MNS Steel Fabrication, I am interested in " + serviceName + ". I would like to discuss my project requirements.");
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}
document.addEventListener("click", function (e) {
  const el = e.target.closest("[data-wa]");
  if (!el) return;
  e.preventDefault();
  openWhatsApp(el.getAttribute("data-wa-service") || "General", el.getAttribute("data-wa-message") || "");
});
