const POKE_API = "https://pokeapi.co/api/v2";
const $cardsContainer = document.querySelector(".cards-container");
const offset = 0;
const limit = 20;

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
  getPokemonList(offset, limit).then((pokemonList) => {
    console.log(pokemonList);

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
  const pokemonName = pokemonList.results[index].name;
  const pokemonCard = document.createElement("div");
  const pokemonImageContainer = document.createElement("figure");
  const pokemonCardImage = document.createElement("img");
  const pokemonCardName = document.createElement("figcaption");

  pokemonCardImage.setAttribute(
    "src",
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`
  );
  pokemonCardImage.setAttribute("alt", pokemonName);
  pokemonCardName.textContent = pokemonName;

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

showPokemonList();
