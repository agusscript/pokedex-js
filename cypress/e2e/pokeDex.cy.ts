/// <reference types="Cypress"/>

describe("PokeDex page elements tests", () => {
  before(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Verify that the main page items are showing", () => {
    cy.get(".loader").should("be.visible");
    cy.get(".overlay").should("not.be.visible");
    cy.get("header").find("h1").contains("PokeDex");
    cy.get("main").should("be.visible");
    cy.get(".cards-container").should("be.visible");
    cy.get(".buttons-container").should("be.visible");
    cy.get(".page-number-container").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  const cardsNum = 16;

  it("Find 16 cards", () => {
    cy.get(".loader").should("have.class", "hidden");
    cy.get(".cards-container").find(".pokemon-card").should("have.length", cardsNum);
  });

  it("Check card elements", () => {
    const card = cy.get(".pokemon-card");
    card.should("be.visible");
    cy.get(".pokemon-img").should("be.visible").should("have.length", cardsNum);
    cy.get(".pokemon-name").should("be.visible").should("have.length", cardsNum);
  });

  it("Check open modal when cards are clicked", () => {
    const pokemonCard = cy.get(".pokemon-card");

    pokemonCard.then((card) => {
      card.each((i, card) => {
        card.click();
        const modal = cy.get(".modal-container");
        modal.should("be.visible");
      });
    });
  });

  it("Check modal elements", () => {
    cy.get(".modal-content").should("be.visible");
    cy.get(".close-btn").should("have.length", cardsNum);
    cy.get(".pokemon-type").should("have.length", cardsNum);
    cy.get(".stat-container").should("have.length", cardsNum * 6);
  });

  it("Check close modal when button is clicked", () => {
    const closeButton = cy.get(".close-btn");
    closeButton.click({ multiple: true, force: true });
    cy.get(".modal-container").should("not.be.visible");
    cy.get(".overlay").should("not.be.visible");
  });

  it("Check buttons", () => {
    const prevButton = cy.get(".prev");
    const nextButton = cy.get(".next");

    prevButton.should("be.visible");
    nextButton.should("be.visible");

    nextButton.click({ force: true });
  });

  it("Verify that the page number is correct", () => {
    cy.get(".page-number-container").contains("2");
  });
});
