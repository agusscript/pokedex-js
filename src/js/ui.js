import { typeColors } from "./type-colors.js";

export function manageLimit() {
  const tabletView = matchMedia("(max-width: 760px)");
  const mobileView = matchMedia("(max-width: 520px)");

  if (mobileView.matches) {
    return 10;
  } else if (tabletView.matches) {
    return 12;
  } else {
    return 16;
  }
}

function createFrontCard(pokemonCard, pokemonInfo) {
  const frontCard = document.createElement("div");
  const imageContainer = document.createElement("figure");
  const image = document.createElement("img");
  const name = document.createElement("figcaption");

  name.textContent = pokemonInfo.name;
  image.setAttribute(
    "src",
    pokemonInfo.sprites.other["official-artwork"].front_default
  );
  image.setAttribute("class", "pokemon-img");
  image.setAttribute("alt", pokemonInfo.name);
  name.setAttribute("class", "pokemon-name");
  frontCard.setAttribute("class", "front-card");

  imageContainer.append(image, name);
  frontCard.appendChild(imageContainer);
  pokemonCard.appendChild(frontCard);
}

function createStatBar(stat, pokemonInfo, backCard) {
  const statContainer = document.createElement("div");
  const statBar = document.createElement("div");
  const selectedStat = document.createElement("div");
  const textStatContainer = document.createElement("p");
  const numberStat = document.createElement("span");

  const pokemonStats = {
    hp: pokemonInfo.stats[0].base_stat,
    defense: pokemonInfo.stats[1].base_stat,
    attack: pokemonInfo.stats[2].base_stat,
    speed: pokemonInfo.stats[5].base_stat,
  };

  selectedStat.style.width = `${pokemonStats[stat]}%`;
  textStatContainer.textContent = stat;
  numberStat.textContent = pokemonStats[stat];

  statContainer.setAttribute("class", "stat-container");
  statBar.setAttribute("class", "stat-bar");
  selectedStat.setAttribute("class", `${stat}-bar`);

  textStatContainer.appendChild(numberStat);
  statBar.appendChild(selectedStat);
  statContainer.append(textStatContainer, statBar);
  backCard.append(statContainer);
}

function createBackCard(pokemonCard, pokemonInfo) {
  const backCard = document.createElement("div");
  const pokemonTypeText = document.createElement("p");
  const pokemonType = pokemonInfo.types[0].type.name;

  pokemonTypeText.textContent = pokemonType;
  pokemonTypeText.style.background = typeColors[pokemonType];
  backCard.setAttribute("class", "back-card");
  pokemonTypeText.setAttribute("class", "pokemon-type");
  backCard.appendChild(pokemonTypeText);

  createStatBar("hp", pokemonInfo, backCard);
  createStatBar("attack", pokemonInfo, backCard);
  createStatBar("defense", pokemonInfo, backCard);
  createStatBar("speed", pokemonInfo, backCard);

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

export function createPokemonCard(pokemonInfo) {
  showBodyElements();
  hideLoader();

  const cardsContainer = document.querySelector(".cards-container");
  const pokemonCardContainer = document.createElement("div");
  const pokemonCard = document.createElement("div");

  pokemonCardContainer.classList.add("pokemon-card-container");
  pokemonCard.classList.add("pokemon-card");

  createFrontCard(pokemonCard, pokemonInfo);
  createBackCard(pokemonCard, pokemonInfo);

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
