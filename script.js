// Extract the certID from the URL
const params = new URLSearchParams(window.location.search);
const certID = params.get("certID");

// DOM elements
const messageElement = document.getElementById("message");
const imageElement = document.getElementById("certificate-image");
const actionsElement = document.getElementById("actions");
const shareButton = document.getElementById("share-button");
const modal = document.getElementById("share-instructions-modal");
const closeButton = document.querySelector(".close-button");
const postButton = document.getElementById("post-button"); // Button to open LinkedIn post

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

        // Copy the post text to clipboard
        const postText = `I am thrilled to share that I successfully participated in the "GEN AI Study Jams 2024" and earned my certificate! A big thank you to GDG on Campus-LNCTS for organizing this amazing event. Issued on November 2024.`;
        navigator.clipboard.writeText(postText).then(() => {
          console.log('Text copied to clipboard');
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });

        // Show the modal with instructions
        modal.style.display = "block";

        // Configure the post button to open LinkedIn post dialog
        postButton.onclick = () => {
          const linkedInPostURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent("GEN AI Certificate")}&summary=${encodeURIComponent(postText)}`;
          window.open(linkedInPostURL, "_blank");
        };
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
