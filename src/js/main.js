import { getPokemonList, getPokemonInfo } from "./api/poke-api.js";

import {
  showLoader,
  hideBodyElements,
  manageLimit,
  createPokemonCard,
  removePokemonCards,
  showPageNumber,
} from "./ui/ui.js";

import { manageSearchExplorer } from "./ui/explorer.js";

const limit = manageLimit();
let offset = 0;
let pageNumber = 1;

async function displayPokemonList() {
  const pokemonList = await getPokemonList(offset, limit);

  const pokemonInfoPromises = pokemonList.results.map((pokemon) =>
    getPokemonInfo(pokemon.name)
  );
  const pokemonInfoList = await Promise.all(pokemonInfoPromises);

  pokemonInfoList.forEach((pokemonInfo) => createPokemonCard(pokemonInfo));
}

document.querySelector(".next").addEventListener("click", () => {
  showLoader();
  removePokemonCards();
  offset += 16;
  pageNumber += 1;
  hideBodyElements();
  displayPokemonList();
  showPageNumber(pageNumber);
});

document.querySelector(".prev").addEventListener("click", () => {
  if (offset !== 0) {
    showLoader();
    removePokemonCards();
    offset -= 16;
    pageNumber -= 1;
    hideBodyElements();
    displayPokemonList();
    showPageNumber(pageNumber);
  }
});

showLoader();
displayPokemonList();
showPageNumber(pageNumber);
manageSearchExplorer();
