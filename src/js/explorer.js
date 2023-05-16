import { getPokemonInfo } from "./poke-api.js";

import {
  createPokemonCard,
  removePokemonCards
} from "./ui.js";

const $searchInput = document.querySelector("#input-search");

function findPokemon(input) {
  getPokemonInfo(input).then((pokemonInfo) => {
    createPokemonCard(pokemonInfo);
  }).catch((e) => console.error(e));
}

export function manageSearchExplorer() {
  document.querySelector(".btn-search").addEventListener("click", () => {
    if ($searchInput.value.length > 0) {
      findPokemon($searchInput.value);
      removePokemonCards();
      createPokemonCard($searchInput.value);
    }
  });
}
