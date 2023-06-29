import { typeColors } from "./type-colors.js";

function createFrontCard(pokemonCard, pokemon) {
  const frontCard = document.createElement("div");
  const imageContainer = document.createElement("figure");
  const image = document.createElement("img");
  const name = document.createElement("figcaption");

  name.textContent = pokemon.name;
  image.setAttribute("src", pokemon.image);
  image.setAttribute("class", "pokemon-img");
  image.setAttribute("alt", pokemon.name);
  name.setAttribute("class", "pokemon-name");
  frontCard.setAttribute("class", "front-card");

  imageContainer.append(image, name);
  frontCard.appendChild(imageContainer);
  pokemonCard.appendChild(frontCard);
}

function createStatBar(stat, pokemon, backCard) {
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
}

function createBackCard(pokemonCard, pokemon) {
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
}

export function showLoader() {
  document.querySelector(".loader").classList.remove("occult");
}

function hideLoader() {
  document.querySelector(".loader").classList.add("occult");
}

export function hideBodyElements() {
  document.querySelector("header").classList.add("hide");
  document.querySelector("main").classList.add("hide");
  document.querySelector("footer").classList.add("hide");
}

function showBodyElements() {
  document.querySelector("header").classList.remove("hide");
  document.querySelector("main").classList.remove("hide");
  document.querySelector("footer").classList.remove("hide");
}

function rotateCard(container, card) {
  container.onclick = () => {
    card.classList.toggle("rotate");
  };
}

export function renderPokemonCard(pokemon) {
  showBodyElements();
  hideLoader();

  const cardsContainer = document.querySelector(".cards-container");
  const pokemonCardContainer = document.createElement("div");
  const pokemonCard = document.createElement("div");

  pokemonCardContainer.classList.add("pokemon-card-container");
  pokemonCard.classList.add("pokemon-card");

  createFrontCard(pokemonCard, pokemon);
  createBackCard(pokemonCard, pokemon);

  pokemonCardContainer.appendChild(pokemonCard);
  cardsContainer.appendChild(pokemonCardContainer);

  rotateCard(pokemonCardContainer, pokemonCard);
}

export function removePokemonCards() {
  const pokemonCards = document.querySelectorAll(".pokemon-card-container");
  for (let i = 0; i < pokemonCards.length; i++) {
    pokemonCards[i].remove();
  }
}

export function showPageNumber(number) {
  document.querySelector(".page-number").textContent = number;
}
