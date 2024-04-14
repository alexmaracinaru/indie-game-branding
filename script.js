document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      populateHTML(data); // Populate HTML with fetched data
      scrollToHash(); // Then scroll to hash after the HTML is populated
    });
});

function populateHTML(data) {
  const mainWrapper = document.querySelector(".main.wrapper");

  data.phases.forEach((phase) => {
    const phaseTemplate = document
      .getElementById("phase-template")
      .content.cloneNode(true);
    phaseTemplate.querySelector("section").id = phase.id; // Ensure IDs match with those expected from hash links
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
      cardTemplate.querySelector(".card-button").textContent = card.buttonText;

      toolkitContainer.appendChild(cardTemplate);
    });

    mainWrapper.appendChild(phaseTemplate);
  });
}

// Function to scroll to the hash after the content is loaded
function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace("#", "");
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("cards.json") // Changed to cards.json
    .then((response) => response.json())
    .then((data) => populateCards(data.cards));
});

function populateCards(cards) {
  const cardsContainer = document.querySelector(".cards-container.wrapper");

  cards.forEach((card) => {
    if (card.buttonText) {
      // Check if it's a regular card
      const cardTemplate = document
        .getElementById("card-template")
        .content.cloneNode(true);
      cardTemplate.querySelector(".card").classList.add(card.color);
      cardTemplate.querySelector(".card-title").textContent = card.title;
      cardTemplate.querySelector(".card-desc").textContent = card.description;
      cardTemplate.querySelector(".card-button").textContent = card.buttonText;
      const button = cardTemplate.querySelector(".card-button");
      button.textContent = card.buttonText;
      button.onclick = () => {
        window.location.href = `toolkit.html#${card.id}`;
      };
      cardsContainer.appendChild(cardTemplate);
    } else {
      // It's the extra card without the button
      const cardExtraTemplate = document
        .getElementById("card-extra-template")
        .content.cloneNode(true);
      cardExtraTemplate.querySelector(".card-extra-content").textContent =
        card.description;
      cardsContainer.appendChild(cardExtraTemplate);
    }
  });
}
