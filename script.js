// Extract the certID from the URL
const params = new URLSearchParams(window.location.search);
const certID = params.get("certID");

// DOM elements
const messageElement = document.getElementById("message");
const imageElement = document.getElementById("certificate-image");
const actionsElement = document.getElementById("actions");
const shareButton = document.getElementById("share-button");
const addToLinkedInButton = document.getElementById("add-to-linkedin");

// Fetch certificate data
fetch("certificates.json")
  .then(response => response.json())
  .then(data => {
    const certificate = data.find(cert => cert.certID === certID);

    if (certificate) {
      messageElement.style.display = "none";
      imageElement.src = certificate.image;
      imageElement.style.display = "block";
      actionsElement.style.display = "block";

      // Text for LinkedIn sharing
      const postText = `I am thrilled to share that I successfully participated in the "${certificate.event}" and earned my certificate! A big thank you to GDG on Campus-LNCTS for organizing this amazing event.`;
      const postURL = encodeURIComponent(window.location.href);
      const linkedInShareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${postURL}&title=GEN%20AI%20Certificate&summary=${encodeURIComponent(postText)}`;

      // Configure Share button
      shareButton.onclick = () => window.open(linkedInShareURL, "_blank");

      // Configure Add to LinkedIn Profile button
      addToLinkedInButton.onclick = () => {
        const addToLinkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
          "GEN AI Study Jams 2024"
        )}&organizationName=${encodeURIComponent(
          "GDG on Campus-LNCTS"
        )}&certUrl=${encodeURIComponent(window.location.href)}&certId=${encodeURIComponent(
          certificate.certID
        )}&dateIssued=${encodeURIComponent("November 2024")}`;
        window.open(addToLinkedInURL, "_blank");
      };

      // Configure Download button
      document.getElementById("download-certificate").onclick = () => {
        const link = document.createElement("a");
        link.href = certificate.image; // Use certificate.image for the download link
        link.download = `Certificate_${certificate.certID}.jpg`;
        link.click();
      };
    } else {
      messageElement.textContent = "Certificate not found. Please check your ID.";
    }
  })
  .catch(() => {
    messageElement.textContent = "Error loading certificate data.";
  });
