import { getPokemonList, getPokemonInfo } from "./poke-api.js";

import {
  showLoader,
  hideBodyElements,
  manageLimit,
  createPokemonCard,
  removePokemonCards,
  showPageNumber,
} from "./ui.js";

import { manageSearchExplorer } from "./explorer.js";

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

manageSearchExplorer();

document.querySelector(".next").addEventListener("click", () => {
  removePokemonCards();
  offset += 16;
  pageNumber += 1;
  hideBodyElements();
  showLoader();
  displayPokemonList();
  showPageNumber(pageNumber);
});

document.querySelector(".prev").addEventListener("click", () => {
  if (offset !== 0) {
    removePokemonCards();
    offset -= 16;
    pageNumber -= 1;
    hideBodyElements();
    showLoader();
    displayPokemonList();
    showPageNumber(pageNumber);
  }
});

showLoader();
displayPokemonList();
showPageNumber(pageNumber);
