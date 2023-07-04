// import { typeColors } from "./type-colors.ts";

const pageNumberText = <HTMLSpanElement>document.querySelector(".page-number");
export const loader = <HTMLDivElement>document.querySelector(".loader");
const header = <HTMLElement>document.querySelector("header");
const main = <HTMLElement>document.querySelector("main");
const footer = <HTMLElement>document.querySelector("footer");

// type Pokemon = {
//   type: number;
//   hp: number;
//   attack: number;
//   defense: number;
//   speed: number;
// };

type PokemonList = {
  name: string;
  url: string;
  id: number;
  image: string;
};

/* function createStatBar(stat, pokemon, backCard) {
  const statContainer = document.createElement("div");
  const statBar = document.createElement("div");
  const selectedStat = document.createElement("div");
  const textStatContainer = document.createElement("p");
  const numberStat = document.createElement("span");

  selectedStat.style.width = `${pokemon[stat]}%`;
  textStatContainer.textContent = stat;
  numberStat.textContent = pokemon[stat];

  statContainer.setAttribute("class", "stat-container");
  statBar.setAttribute("class", "stat-bar");
  selectedStat.setAttribute("class", `${stat}-bar`);

  textStatContainer.appendChild(numberStat);
  statBar.appendChild(selectedStat);
  statContainer.append(textStatContainer, statBar);
  backCard.append(statContainer);
} */

/* function createBackCard(pokemonCard, pokemon) {
  const backCard = document.createElement("div");
  const pokemonTypeText = document.createElement("p");

  pokemonTypeText.textContent = pokemon.type;
  pokemonTypeText.style.background = typeColors[pokemon.type];
  backCard.setAttribute("class", "back-card");
  pokemonTypeText.setAttribute("class", "pokemon-type");
  backCard.appendChild(pokemonTypeText);

  createStatBar("hp", pokemon, backCard);
  createStatBar("attack", pokemon, backCard);
  createStatBar("defense", pokemon, backCard);
  createStatBar("speed", pokemon, backCard);

  pokemonCard.appendChild(backCard);
} */

export function renderCard(
  pokemonList: PokemonList,
  index: number,
  callBackListener: Function
): void {
  showBodyElements();
  hideElement(loader);

  const cardsContainer = <HTMLDivElement>document.querySelector(".cards-container");
  const pokemonCard = <HTMLDivElement>document.createElement("div");

  pokemonCard.classList.add("pokemon-card");
  pokemonCard.setAttribute("data-name", pokemonList.name[index]);

  createFrontCard(pokemonCard, index, pokemonList);

  cardsContainer.appendChild(pokemonCard);

  callBackListener(pokemonCard);
}

function createFrontCard(
  pokemonCard: HTMLDivElement,
  index: number,
  pokemonList: PokemonList
): void {
  const imageContainer = document.createElement("figure");
  const image = document.createElement("img");
  const name = document.createElement("figcaption");

  name.textContent = pokemonList.name[index];
  image.setAttribute("src", pokemonList.image[index]);
  image.setAttribute("class", "pokemon-img");
  image.setAttribute("alt", pokemonList.name[index]);
  name.setAttribute("class", "pokemon-name");

  imageContainer.append(image, name);
  pokemonCard.appendChild(imageContainer);
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
