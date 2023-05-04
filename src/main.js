import {
  getPokemonList,
  getPokemonInfo
} from "./poke-api.js";

import {
  showLoader,
  hideBodyElements,
  createPokemonCard,
  removePokemonCards,
  showPageNumber
} from "./ui.js";

let offset = 0;
const limit = 16;
let pageNumber = 1;

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
  showPageNumber(pageNumber);
}

document.querySelector(".next").addEventListener("click", () => {
  removePokemonCards();
  offset += 16;
  pageNumber += 1;
  showPokemonList();
});

document.querySelector(".prev").addEventListener("click", () => {
  if (offset !== 0) {
    removePokemonCards();
    offset -= 16;
    pageNumber -= 1;
    showPokemonList();
  }
});

showPokemonList();
