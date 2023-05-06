import {
  getPokemonList,
  getPokemonInfo
} from "./poke-api.js";

import {
  showLoader,
  hideBodyElements,
  manageLimit,
  createPokemonCard,
  removePokemonCards,
  showPageNumber,
} from "./ui.js";

import {
  $searchInput,
  findPokemon
} from "./explorer.js";

const limit = manageLimit();
let offset = 0;
let pageNumber = 1;

async function showPokemonList() {
  const pokemonList = await getPokemonList(offset, limit);

  for (let i = 0; i < limit; i++) {
    getPokemonInfo(pokemonList.results[i].name).then((pokemonInfo) => {
      createPokemonCard(pokemonInfo);
    }).catch((e) => console.error(e));
  }
}

document.querySelector(".btn-search").onclick = () => {
  findPokemon($searchInput.value);
  removePokemonCards();
  createPokemonCard($searchInput.value);
};

document.querySelector(".next").addEventListener("click", () => {
  removePokemonCards();
  offset += 16;
  pageNumber += 1;
  hideBodyElements();
  showLoader();
  showPokemonList();
  showPageNumber(pageNumber);
});

document.querySelector(".prev").addEventListener("click", () => {
  if (offset !== 0) {
    removePokemonCards();
    offset -= 16;
    pageNumber -= 1;
    hideBodyElements();
    showLoader();
    showPokemonList();
    showPageNumber(pageNumber);
  }
});

showLoader();
showPokemonList();
showPageNumber(pageNumber);
