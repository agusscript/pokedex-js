import { getPokemonInfo } from "./poke-api.js";

import { createPokemonCard, removePokemonCards } from "./ui.js";

const $searchInput = document.querySelector("#input-search");

async function findPokemon(pokemonName) {
  try {
    const pokemonInfo = await getPokemonInfo(pokemonName);
    createPokemonCard(pokemonInfo);
  } catch (error) {
    console.error(error);
  }
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
