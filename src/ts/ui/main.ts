import { typeColors } from "./type-colors.ts";

const pageNumberText = <HTMLSpanElement>document.querySelector(".page-number");
export const loader = <HTMLDivElement>document.querySelector(".loader");
const header = <HTMLElement>document.querySelector("header");
const body = <HTMLElement>document.querySelector("body");
const main = <HTMLElement>document.querySelector("main");
const footer = <HTMLElement>document.querySelector("footer");
const overlay = <HTMLDivElement>document.querySelector(".overlay");

type Pokemon = {
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  specialAttack: number;
  specialDefense: number;
};

type PokemonList = {
  name: string;
  url: string;
  id: number;
  image: string;
};

function createStatBar(stat: string, pokemon: Pokemon, modal: HTMLElement): void {
  const statContainer = document.createElement("div");
  const statBar = document.createElement("div");
  const selectedStat = document.createElement("div");
  const textStatContainer = document.createElement("p");
  const numberStat = document.createElement("span");

  const pokemonStat = pokemon[stat as keyof Pokemon];

  selectedStat.style.width = `${pokemonStat}%`;
  textStatContainer.textContent = stat;
  numberStat.textContent = pokemonStat.toString();

  statContainer.setAttribute("class", "stat-container");
  statBar.setAttribute("class", "stat-bar");
  selectedStat.setAttribute("class", `${stat}-bar`);

  textStatContainer.appendChild(numberStat);
  statBar.appendChild(selectedStat);
  statContainer.append(textStatContainer, statBar);
  modal.append(statContainer);
}

function createModal(pokemon: Pokemon): void {
  const modalContainer = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeButton = document.createElement("button");
  const closeImage = document.createElement("img");
  const name = document.createElement("h2");
  const type = document.createElement("p");

  name.textContent = pokemon.name;
  type.textContent = pokemon.type;
  type.style.background = typeColors[pokemon.type];
  modalContainer.setAttribute("class", "modal-container open");
  modalContent.setAttribute("class", "modal-content");
  closeButton.setAttribute("class", "close-btn");
  closeImage.setAttribute("class", "close-img");
  closeImage.setAttribute("src", "assets/images/icon-close-menu.svg");
  name.setAttribute("class", "pokemon-name");
  type.setAttribute("class", "pokemon-type");

  closeButton.appendChild(closeImage);
  modalContent.append(closeButton, name, type);
  modalContainer.appendChild(modalContent);
  body.appendChild(modalContainer);

  createStatBar("hp", pokemon, modalContent);
  createStatBar("attack", pokemon, modalContent);
  createStatBar("defense", pokemon, modalContent);
  createStatBar("speed", pokemon, modalContent);
  createStatBar("specialAttack", pokemon, modalContent);
  createStatBar("specialDefense", pokemon, modalContent);

  closeButton.onclick = () => {
    modalContainer.classList.add("close");
    hideElement(overlay);
  };

  overlay.onclick = () => {
    modalContainer.classList.add("close");
    hideElement(overlay);
  };
}

export function renderModal(pokemon: Pokemon): void {
  showElement(overlay);
  createModal(pokemon);
}

export function renderCard(
  pokemonList: PokemonList,
  index: number,
  callBackListener: Function
): void {
  showBodyElements();
  hideElement(loader);

  const cardsContainer = <HTMLDivElement>document.querySelector(".cards-container");
  const pokemonCard = <HTMLDivElement>document.createElement("div");
  const imageContainer = document.createElement("figure");
  const image = document.createElement("img");
  const name = document.createElement("figcaption");

  pokemonCard.classList.add("pokemon-card");
  pokemonCard.setAttribute("data-name", pokemonList.name[index]);
  name.textContent = pokemonList.name[index];
  image.setAttribute("src", pokemonList.image[index]);
  image.setAttribute("class", "pokemon-img");
  image.setAttribute("alt", pokemonList.name[index]);
  name.setAttribute("class", "pokemon-name");

  imageContainer.append(image, name);
  pokemonCard.appendChild(imageContainer);

  cardsContainer.appendChild(pokemonCard);

  callBackListener(pokemonCard);
}

export function showElement(element: HTMLElement): void {
  element.classList.remove("hidden");
}

export function hideElement(element: HTMLElement): void {
  element.classList.add("hidden");
}

export function hideBodyElements(): void {
  hideElement(header);
  hideElement(main);
  hideElement(footer);
}

function showBodyElements(): void {
  showElement(header);
  showElement(main);
  showElement(footer);
}

export function removePokemonCards(): void {
  const pokemonCards = <HTMLDivElement>document.querySelector(".cards-container");
  while (pokemonCards.firstChild) {
    pokemonCards.removeChild(pokemonCards.firstChild);
  }
}

export function showPageNumber(number: number): void {
  pageNumberText.textContent = number.toString();
}
