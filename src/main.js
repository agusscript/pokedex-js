import {
  getPokemonList,
  getPokemonInfo
} from "./poke-api.js";

import {
  showLoader,
  hideBodyElements,
  createPokemonCard,
  removePokemonCards
} from "./ui.js";

let offset = 0;
const limit = 16;

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
