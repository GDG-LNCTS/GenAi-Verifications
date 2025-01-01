const params = new URLSearchParams(window.location.search);
const certID = params.get("certID");

if (certID) {
  fetch("certificates.json")
    .then(response => response.json())
    .then(data => {
      const cert = data.find(item => item.certID === certID);
      const resultElement = document.getElementById("result");

      if (cert) {
        resultElement.innerHTML = `
          <h2>${cert.name}</h2>
          <p>Event: ${cert.event}</p>
          <p>Status: ${cert.status}</p>
        `;
        document.getElementById("shareLinkedIn").style.display = "block";
        document.getElementById("shareLinkedIn").onclick = () => {
          const linkedInURL = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=GEN%20AI%20Certificate&summary=I%20just%20earned%20my%20certificate%20for%20participating%20in%20the%20GEN%20AI%20Study%20Jams!`;
          window.open(linkedInURL, "_blank");
        };
      } else {
        resultElement.textContent = "Certificate not found or invalid.";
      }
    })
    .catch(() => {
      document.getElementById("result").textContent = "Error loading certificate data.";
    });
} else {
  document.getElementById("result").textContent = "No certificate ID provided.";
}
