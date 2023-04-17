const POKE_API = "https://pokeapi.co/api/v2";
const $cardsContainer = document.querySelector(".cards-container");
let offset = 0;
let limit = 20;

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
  occultBodyElements();
  getPokemonList(offset, limit).then((pokemonList) => {
    // console.log(pokemonList);

    for (let i = 0; i < pokemonList.results.length; i++) {
      getPokemonInfo(pokemonList.results[i].name).then((pokemonInfo) => {
        // console.log(pokemonInfo);
        createPokemonCard(pokemonList, pokemonInfo, i);
        // mostrar stats cuando se de vuelta la card
      });
    }
  });
}

function createPokemonCard(pokemonList, pokemonInfo, index) {
  occultLoader();
  showBodyElements();
  const pokemonName = pokemonList.results[index].name;
  const pokemonCard = document.createElement("div");
  const pokemonImageContainer = document.createElement("figure");
  const pokemonCardImage = document.createElement("img");
  const pokemonCardName = document.createElement("figcaption");

  pokemonCardImage.setAttribute(
    "src",
    pokemonInfo.sprites.other["official-artwork"].front_default
  );
  pokemonCardImage.setAttribute("alt", pokemonName);
  pokemonCardName.textContent = pokemonName;
  pokemonCard.setAttribute("class", "pokemon-card");

  pokemonImageContainer.append(pokemonCardImage, pokemonCardName);
  pokemonCard.appendChild(pokemonImageContainer);
  $cardsContainer.appendChild(pokemonCard);
}

function showLoader() {
  document.querySelector(".loader").classList.remove("occult");
}

function occultLoader() {
  document.querySelector(".loader").classList.add("occult");
}

function showBodyElements() {
  document.querySelector("header").classList.remove("occult");
  document.querySelector("main").classList.remove("occult");
  document.querySelector("footer").classList.remove("occult");
}

function occultBodyElements() {
  document.querySelector("header").classList.add("occult");
  document.querySelector("main").classList.add("occult");
  document.querySelector("footer").classList.add("occult");
}

function removePokemonCards() {
  document.querySelectorAll(".pokemon-card").forEach((card) => {
    card.remove();
  });
}

document.querySelector(".next").addEventListener("click", () => {
  removePokemonCards();
  offset += 20;
  showPokemonList();
});

document.querySelector(".prev").addEventListener("click", () => {
  if (offset != 0) {
    removePokemonCards();
    offset -= 20;
    showPokemonList();
  }
});

showPokemonList();
