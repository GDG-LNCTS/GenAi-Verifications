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

      // LinkedIn Sharing
      const postText = `I am thrilled to share that I successfully participated in the ${certificate.event} and earned my certificate! Thank you to everyone who made this event possible.`;
      const postURL = encodeURIComponent(window.location.href);
      const linkedInShareURL = `https://www.linkedin.com/shareArticle?mini=true&url=${postURL}&title=GEN%20AI%20Certificate&summary=${encodeURIComponent(postText)}`;

      // Configure buttons
      shareButton.onclick = () => window.open(linkedInShareURL, "_blank");
      addToLinkedInButton.onclick = () => {
        const addToLinkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
          certificate.event
        )}&organizationName=Google%20Developer%20Group%20LNCTS&certUrl=${postURL}&certId=${certificate.certID}`;
        window.open(addToLinkedInURL, "_blank");
      };
    } else {
      messageElement.textContent = "Certificate not found. Please check your ID.";
    }
  })
  .catch(() => {
    messageElement.textContent = "Error loading certificate data.";
  });
