import { setPageNumber, showElement, hideElement } from "../main";

describe("showElement", () => {
  it("should remove 'hidden' class from the element", () => {
    const element = document.createElement("div");
    element.classList.add("hidden");

    showElement(element);

    expect(element.classList.contains("hidden")).toBe(false);
  });
});

describe("hideElement", () => {
  test("should hide body elements by adding the 'hidden' class", () => {
    const element = document.createElement("div");
    hideElement(element);

    expect(element.classList.contains("hidden")).toBe(true);
  });
});

describe("setPageNumber", () => {
  it("should set the text content of pageNumberText to the input number", () => {
    const pageNumberText = document.createElement("span");
    const number = 5;

    setPageNumber(pageNumberText, number);

    expect(pageNumberText.textContent).toBe("5");
  });
});
