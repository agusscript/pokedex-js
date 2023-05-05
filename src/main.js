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
  showPageNumber
} from "./ui.js";

const limit = manageLimit();
let offset = 0;
let pageNumber = 1;

function showPokemonList() {
  getPokemonList(offset, limit).then((pokemonList) => {
    for (let i = 0; i < pokemonList.results.length; i++) {
      getPokemonInfo(pokemonList.results[i].name).then((pokemonInfo) => {
        createPokemonCard(pokemonInfo);
      });
    }
  });
}

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
