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
const overlay = document.querySelector(".overlay");
const postButton = document.getElementById("post-button");
const addToLinkedInButton = document.getElementById("add-to-linkedin-profile");
const downloadButton = document.getElementById("download-certificate");

// Fetch certificate data
fetch("certificates.json")
  .then((response) => response.json())
  .then((data) => {
    // Find the certificate based on certID
    const certificate = data.find((cert) => cert.certID === certID);

    if (certificate) {
      // Hide loading message and show certificate
      messageElement.style.display = "none";
      imageElement.src = certificate.image;
      imageElement.alt = `Certificate for ${certificate.certID}`;
      imageElement.style.display = "block";
      actionsElement.style.display = "block";

      // Configure Share button
      shareButton.onclick = () => {
        // Copy post text to clipboard
        const postText = `I am thrilled to share that I successfully participated in the "GEN AI Study Jams 2024" and earned my certificate! A big thank you to GDG on Campus-LNCTS for organizing this amazing event. Issued on November 2024.`;
        navigator.clipboard
          .writeText(postText)
          .then(() => {
            console.log("Text copied to clipboard");
          })
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });

        // Show modal
        modal.classList.add("show");
        overlay.classList.add("show");

        // Configure LinkedIn Post button
        postButton.onclick = () => {
          const linkedInPostURL = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            window.location.href
          )}&title=${encodeURIComponent(
            "GEN AI Certificate"
          )}&summary=${encodeURIComponent(postText)}`;
          window.open(linkedInPostURL, "_blank");
        };
      };

      // Configure Add to LinkedIn Profile button
      addToLinkedInButton.onclick = () => {
        const addToLinkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
          "GEN AI Study Jams 2024"
        )}&organizationName=${encodeURIComponent(
          "GDG on Campus-LNCTS"
        )}&certUrl=${encodeURIComponent(
          certificate.credentialURL
        )}&certId=${encodeURIComponent(
          certificate.certID
        )}&issueYear=2024&issueMonth=11`;
        window.open(addToLinkedInURL, "_blank");
      };

      // Configure Download button
      downloadButton.onclick = () => {
        const link = document.createElement("a");
        link.href = certificate.image;
        link.download = `Certificate_${certificate.certID}.jpg`;
        link.click();
      };
    } else {
      // Handle certificate not found
      messageElement.textContent = "Certificate not found. Please check your ID.";
    }
  })
  .catch(() => {
    // Handle fetch error
    messageElement.textContent = "Error loading certificate data.";
  });

// Close the modal when the close button is clicked
closeButton.onclick = () => {
  modal.classList.remove("show");
  overlay.classList.remove("show");
};

// Close the modal when clicking outside of the modal
overlay.onclick = () => {
  modal.classList.remove("show");
  overlay.classList.remove("show");
};
