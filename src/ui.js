import { typeColors } from "./type-colors.js";

function createFrontCard(pokemonCard, pokemonInfo) {
  const frontCard = document.createElement("div");
  const pokemonImageContainer = document.createElement("figure");
  const pokemonCardImage = document.createElement("img");
  const pokemonCardName = document.createElement("figcaption");
  const pokemonName = pokemonInfo.name;

  pokemonCardName.textContent = pokemonName;
  pokemonCardImage.setAttribute(
    "src",
    pokemonInfo.sprites.other.dream_world.front_default
  );
  pokemonCardImage.setAttribute("class", "pokemon-img");
  pokemonCardImage.setAttribute("alt", pokemonName);
  pokemonCardName.setAttribute("class", "pokemon-name");
  frontCard.setAttribute("class", "front-card");

  pokemonImageContainer.append(pokemonCardImage, pokemonCardName);
  frontCard.appendChild(pokemonImageContainer);
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
    speed: pokemonInfo.stats[5].base_stat
  };

  selectedStat.style.width = `${pokemonStats[stat]}%`;
  textStatContainer.textContent = stat;
  numberStat.textContent = pokemonStats[stat];

  statContainer.setAttribute("class", "stat-container");
  statBar.setAttribute("class", "stat-bar");
  selectedStat.setAttribute("class", `${stat}-bar`);

  textStatContainer.appendChild(numberStat);
  statBar.appendChild(selectedStat);
  statContainer.appendChild(textStatContainer, statBar);
  statContainer.appendChild(statBar);
  backCard.appendChild(statContainer);
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

function occultLoader() {
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
  occultLoader();

  const $cardsContainer = document.querySelector(".cards-container");
  const pokemonCardContainer = document.createElement("div");
  const pokemonCard = document.createElement("div");
  pokemonCardContainer.setAttribute("class", "pokemon-card-container");
  pokemonCard.setAttribute("class", "pokemon-card");

  createFrontCard(pokemonCard, pokemonInfo);
  createBackCard(pokemonCard, pokemonInfo);

  pokemonCardContainer.appendChild(pokemonCard);
  $cardsContainer.appendChild(pokemonCardContainer);

  rotateCard(pokemonCardContainer, pokemonCard);
}

export function removePokemonCards() {
  showLoader();
  document.querySelectorAll(".pokemon-card-container").forEach((card) => {
    card.remove();
  });
}

export function showPageNumber(number) {
  document.querySelector(".page-number").textContent = number;
}
