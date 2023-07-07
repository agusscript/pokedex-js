const pageNumberText = <HTMLSpanElement>document.querySelector(".page-number");
const loader = <HTMLDivElement>document.querySelector(".loader");
const header = <HTMLElement>document.querySelector("header");
const body = <HTMLElement>document.querySelector("body");
const main = <HTMLElement>document.querySelector("main");
const footer = <HTMLElement>document.querySelector("footer");
const overlay = <HTMLDivElement>document.querySelector(".overlay");

function showElement(element: HTMLElement): void {
  element.classList.remove("hidden");
}

function hideElement(element: HTMLElement): void {
  element.classList.add("hidden");
}

function hideBodyElements(): void {
  hideElement(header);
  hideElement(main);
  hideElement(footer);
}

function showBodyElements(): void {
  showElement(header);
  showElement(main);
  showElement(footer);
}

function showPageNumber(number: number): void {
  pageNumberText.textContent = number.toString();
}

export {
  loader,
  body,
  overlay,
  showElement,
  hideElement,
  hideBodyElements,
  showBodyElements,
  showPageNumber,
};
