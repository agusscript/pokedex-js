import { getPokemonList, getPokemonInfo } from "./api/pokeApi.js";
import { mapPokemon } from "./mappers/mappers.js";
import {
  renderPokemonCard,
  removePokemonCards,
  showPageNumber,
  showLoader,
  hideBodyElements,
} from "./ui/main.js";

const limit = 16;
let offset = 0;
let pageNumber = 1;

async function displayPokemonList() {
  const pokemonList = await getPokemonList(offset, limit);

  const pokemonInfoPromises = pokemonList.results.map((pokemon) =>
    getPokemonInfo(pokemon.name)
  );

  const pokemonInfoList = await Promise.all(pokemonInfoPromises);

  pokemonInfoList.forEach((pokemonInfo) => {
    const pokemon = mapPokemon(pokemonInfo);
    renderPokemonCard(pokemon);
  });
}

async function findPokemon(pokemonName) {
  const pokemonInfo = await getPokemonInfo(pokemonName);
  const pokemon = mapPokemon(pokemonInfo);
  renderPokemonCard(pokemon);
}

export function manageSearchExplorer() {
  const $searchInput = document.querySelector("#input-search");
  const $buttonSearch = document.querySelector(".btn-search");

  $buttonSearch.onclick = () => {
    if ($searchInput.value.length > 0) {
      removePokemonCards();
      findPokemon($searchInput.value);
    }
  };
}

document.querySelector(".next").onclick = () => {
  showLoader();
  removePokemonCards();
  offset += 16;
  pageNumber += 1;
  hideBodyElements();
  displayPokemonList();
  showPageNumber(pageNumber);
};

document.querySelector(".prev").onclick = () => {
  if (offset !== 0) {
    showLoader();
    removePokemonCards();
    offset -= 16;
    pageNumber -= 1;
    hideBodyElements();
    displayPokemonList();
    showPageNumber(pageNumber);
  }
};

export function initialize() {
  showLoader();
  displayPokemonList();
  showPageNumber(pageNumber);
  manageSearchExplorer();
}
