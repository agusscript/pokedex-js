import { getPokemonInfo } from "./poke-api.js";
import { createPokemonCard } from "./ui.js";

export const $searchInput = document.querySelector("#search-pokemon");

export function findPokemon(input) {
  getPokemonInfo(input).then((pokemonInfo) => {
    createPokemonCard(pokemonInfo);
  }).catch((e) => console.error(e));
}