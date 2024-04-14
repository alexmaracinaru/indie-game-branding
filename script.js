document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => populateHTML(data));
});

function populateHTML(data) {
  const mainWrapper = document.querySelector(".main.wrapper");

  data.phases.forEach((phase) => {
    const phaseTemplate = document
      .getElementById("phase-template")
      .content.cloneNode(true);

    phaseTemplate.querySelector(".main-heading").textContent = phase.title;
    phaseTemplate.querySelector(".phase-desc").textContent = phase.description;

    const toolkitContainer = phaseTemplate.querySelector(".toolkit-container");

    phase.cards.forEach((card) => {
      const cardTemplate = document
        .getElementById("card-template")
        .content.cloneNode(true);

      cardTemplate.querySelector(".toolkit-card").classList.add(card.color);
      cardTemplate.querySelector(".toolkit-card-title").innerHTML =
        card.title.replace(/\s+/g, "<br>"); // Safe usage as controlled
      cardTemplate.querySelector(".toolkit-card-desc").textContent =
        card.description;
      cardTemplate.querySelector(".card-button").textContent = card.buttonText;

      toolkitContainer.appendChild(cardTemplate);
    });

    mainWrapper.appendChild(phaseTemplate);
  });
}
