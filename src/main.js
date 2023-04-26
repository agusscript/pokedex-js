const POKE_API = "https://pokeapi.co/api/v2";
let offset = 0;
const limit = 16;

const typeColors = {
  grass: "linear-gradient(to right, #6fce40, #103000)",
  steel: "linear-gradient(to right, #66c0e0, #002e3f)",
  water: "linear-gradient(to right, #318bff, #00224e)",
  dragon: "linear-gradient(to right, #5b6eff, #000846)",
  electric: "linear-gradient(to right, #ffce2c, #3f3000)",
  ghost: "linear-gradient(to right, #a353a3, #360036)",
  fire: "linear-gradient(to right, #ff2929, #3a0000)",
  normal: "linear-gradient(to right, #c0c0c0, #252525)",
  ice: "linear-gradient(to right, #3fd8ff, #002630)",
  fighting: "linear-gradient(to right, #ff8000, #291400)",
  bug: "linear-gradient(to right, #91a119, #1e2200)",
  psychic: "linear-gradient(to right, #f14179, #3b0013)",
  rock: "linear-gradient(to right, #afa981, #241f00)",
  ground: "linear-gradient(to right, #915121, #2c1300)",
  poison: "linear-gradient(to right, #9141cb, #22003a)",
  fairy: "linear-gradient(to right, #f170f1, #470047)",
  dark: "linear-gradient(to right, #585448, #1a1401)",
  flying: "linear-gradient(to right, #71aeff, #00224e)"
};

function getPokemonList(offset, limit) {
  return fetch(`${POKE_API}/pokemon/?offset=${offset}&limit=${limit}`).then(
    (response) => response.json()
  );
}

function getPokemonInfo(pokemon) {
  return fetch(`${POKE_API}/pokemon/${pokemon}`).then((response) =>
    response.json()
  );
}

function showPokemonList() {
  showLoader();
  hideBodyElements();

  getPokemonList(offset, limit).then((pokemonList) => {
    for (let i = 0; i < pokemonList.results.length; i++) {
      getPokemonInfo(pokemonList.results[i].name).then((pokemonInfo) => {
        createPokemonCard(pokemonInfo);
      });
    }
  });
}

function createPokemonCard(pokemonInfo) {
  occultLoader();
  showBodyElements();

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

function createFrontCard(pokemonCard, pokemonInfo) {
  const frontCard = document.createElement("div");
  const pokemonImageContainer = document.createElement("figure");
  const pokemonCardImage = document.createElement("img");
  const pokemonCardName = document.createElement("figcaption");
  const pokemonName = pokemonInfo.name;

  pokemonCardName.textContent = pokemonName;
  pokemonCardImage.setAttribute(
    "src",
    pokemonInfo.sprites.other["official-artwork"].front_default
  );
  pokemonCardImage.setAttribute("class", "pokemon-img");
  pokemonCardImage.setAttribute("alt", pokemonName);
  pokemonCardName.setAttribute("class", "pokemon-name");
  frontCard.setAttribute("class", "front-card");

  pokemonImageContainer.append(pokemonCardImage, pokemonCardName);
  frontCard.appendChild(pokemonImageContainer);
  pokemonCard.appendChild(frontCard);
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

function rotateCard(container, card) {
  container.onclick = () => {
    card.classList.toggle("rotate");
  };
}

function showLoader() {
  document.querySelector(".loader").classList.remove("occult");
}

function occultLoader() {
  document.querySelector(".loader").classList.add("occult");
}

function showBodyElements() {
  document.querySelector("header").classList.remove("hide");
  document.querySelector("main").classList.remove("hide");
  document.querySelector("footer").classList.remove("hide");
}

function hideBodyElements() {
  document.querySelector("header").classList.add("hide");
  document.querySelector("main").classList.add("hide");
  document.querySelector("footer").classList.add("hide");
}

function removePokemonCards() {
  document.querySelectorAll(".pokemon-card-container").forEach((card) => {
    card.remove();
  });
}

document.querySelector(".next").addEventListener("click", () => {
  removePokemonCards();
  offset += 16;
  showPokemonList();
});

document.querySelector(".prev").addEventListener("click", () => {
  if (offset !== 0) {
    removePokemonCards();
    offset -= 16;
    showPokemonList();
  }
});

showPokemonList();
