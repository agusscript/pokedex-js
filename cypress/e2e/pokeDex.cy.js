/// <reference types="Cypress"/>

describe("PokeDex tests", () => {
  before(() => {
    cy.visit("index.html");
  });

  it("Verify that the main page items are showing", () => {
    const loader = cy.get(".loader");
    
    loader.should("be.visible");
    cy.get("header").find("h1").contains("PokeDex");
    cy.get("main").should("be.visible");
    cy.get("footer").should("be.visible");
    loader.should("have.class", "occult");
  });
});
