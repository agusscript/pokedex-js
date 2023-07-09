import { removePokemonCards } from "../card";

describe("removePokemonCards", () => {
  it("should remove all child elements if the container has no child elements", () => {
    const container = document.createElement("div");

    removePokemonCards(container);

    expect(container.childElementCount).toBe(0);
  });

  it("should remove the child element if the container has one child element", () => {
    const container = document.createElement("div");
    const childElement = document.createElement("div");
    container.appendChild(childElement);

    removePokemonCards(container);

    expect(container.childElementCount).toBe(0);
  });

  it("should remove all child elements if the container has multiple child elements", () => {
    const container = document.createElement("div");
    const childElement1 = document.createElement("div");
    const childElement2 = document.createElement("div");
    const childElement3 = document.createElement("div");
    container.appendChild(childElement1);
    container.appendChild(childElement2);
    container.appendChild(childElement3);

    removePokemonCards(container);

    expect(container.childElementCount).toBe(0);
  });
});
