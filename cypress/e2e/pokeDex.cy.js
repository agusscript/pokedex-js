/// <reference types="Cypress"/>

describe("PokeDex tests", () => {
  before(() => {
    cy.visit("index.html");
  });

  it("Verify that the main page items are showing", () => {
    cy.get(".loader").should("be.visible");
    cy.get("header").find("h1").contains("PokeDex");
    cy.get("main").should("be.visible");
    cy.get("footer").should("be.visible");
  });

  const cardsNum = 16;

  it("Find 16 cards", () => {
    cy.get(".loader").should("have.class", "occult");
    cy.get(".cards-container")
      .find(".pokemon-card")
      .should("have.length", cardsNum);
  });

  it("Check front card elements", () => {
    const frontCard = cy.get(".front-card");
    frontCard.should("be.visible");
    cy.get(".pokemon-img").should("be.visible").should("have.length", cardsNum);
    cy.get(".pokemon-name")
      .should("be.visible")
      .should("have.length", cardsNum);
  });

  it("Check rotate cards", () => {
    const pokemonCard = cy.get(".pokemon-card");

    pokemonCard.then((card) => {
      card.each((i, card) => {
        card.click();
        pokemonCard.should("have.class", "rotate");
      });
    });
  });

  it("Check back card elements", () => {
    cy.get(".back-card").should("be.visible");
    cy.get(".pokemon-type").should("have.length", cardsNum);
    cy.get(".stat-container").should("have.length", cardsNum * 4);
  });
});
