document.addEventListener("DOMContentLoaded", function () {
  // Fetch and populate toolkit page content
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      populateHTML(data);
      scrollToHash(); // Ensure to scroll to hash after HTML is populated
    });

  // Fetch and populate homepage cards
  fetch("cards.json")
    .then((response) => response.json())
    .then((data) => populateCards(data.cards));
});

function populateHTML(data) {
  const mainWrapper = document.querySelector(".main.wrapper");
  data.phases.forEach((phase) => {
    const phaseTemplate = document
      .getElementById("phase-template")
      .content.cloneNode(true);
    phaseTemplate.querySelector("section").id = phase.id;
    phaseTemplate.querySelector(".main-heading").textContent = phase.title;
    phaseTemplate.querySelector(".phase-desc").textContent = phase.description;
    const toolkitContainer = phaseTemplate.querySelector(".toolkit-container");

    phase.cards.forEach((card) => {
      const cardTemplate = document
        .getElementById("card-template")
        .content.cloneNode(true);
      cardTemplate.querySelector(".toolkit-card").classList.add(card.color);
      cardTemplate.querySelector(".toolkit-card-title").innerHTML =
        card.title.replace(/\s+/g, "<br>");
      cardTemplate.querySelector(".toolkit-card-desc").textContent =
        card.description;

      const button = cardTemplate.querySelector(".card-button");
      button.textContent = card.buttonText;
      // Set the button action based on the provided link in JSON
      if (card.buttonLink) {
        button.onclick = () => window.open(card.buttonLink, "_blank");
      } else {
        // Optionally handle buttons without external links
        button.onclick = () => console.log("No link provided for this button.");
      }

      toolkitContainer.appendChild(cardTemplate);
    });

    mainWrapper.appendChild(phaseTemplate);
  });
}

function populateCards(cards) {
  const cardsContainer = document.querySelector(".cards-container.wrapper");

  cards.forEach((card) => {
    if (card.buttonText) {
      // Regular card with button
      const cardTemplate = document
        .getElementById("card-template")
        .content.cloneNode(true);
      cardTemplate.querySelector(".card").classList.add(card.color);
      cardTemplate.querySelector(".card-title").textContent = card.title;
      cardTemplate.querySelector(".card-desc").textContent = card.description;
      const button = cardTemplate.querySelector(".card-button");
      button.textContent = card.buttonText;
      button.onclick = () => {
        if (card.id) {
          window.location.href = `toolkit.html#${card.id}`;
        } else {
          console.log("No ID provided for this card.");
        }
      };
      cardsContainer.appendChild(cardTemplate);
    } else {
      // Extra card without a button
      const cardExtraTemplate = document
        .getElementById("card-extra-template")
        .content.cloneNode(true);
      cardExtraTemplate.querySelector(".card-extra-content").textContent =
        card.description;
      cardsContainer.appendChild(cardExtraTemplate);
    }
  });
}

function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace("#", "");
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Element not found for hash: " + id);
    }
  }
}
