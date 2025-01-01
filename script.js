// Extract the certID from the URL
const params = new URLSearchParams(window.location.search);
const certID = params.get("certID");

// DOM elements
const messageElement = document.getElementById("message");
const imageElement = document.getElementById("certificate-image");
const actionsElement = document.getElementById("actions");
const shareButton = document.getElementById("share-button");
const addToLinkedInButton = document.getElementById("add-to-linkedin");
const modal = document.getElementById("share-instructions-modal");
const closeButton = document.querySelector(".close-button");

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

      // Configure Share button
      shareButton.onclick = () => {
        // Auto-download the certificate image
        const link = document.createElement("a");
        link.href = certificate.image; // Use certificate.image for the download link
        link.download = `Certificate_${certificate.certID}.jpg`;
        link.click();

        // Show the modal with instructions
        modal.style.display = "block";
      };

      // Configure Add to LinkedIn Profile button
      addToLinkedInButton.onclick = () => {
        // Construct the LinkedIn profile update URL with all required details
        const addToLinkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent("GEN AI Study Jams 2024")}&organizationName=${encodeURIComponent("GDG on Campus-LNCTS")}&certUrl=${encodeURIComponent(window.location.href)}&certId=${encodeURIComponent(certificate.certID)}&dateIssued=${encodeURIComponent("November 2024")}`;
        
        // Open the LinkedIn add profile page in a new tab
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

// Close the modal when the close button is clicked
closeButton.onclick = () => {
  modal.style.display = "none";
};

// Close the modal when clicking outside of the modal
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
