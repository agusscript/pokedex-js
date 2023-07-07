import { showPageNumber, hideBodyElements, showElement, loader } from "./ui/main.ts";
import { renderCard, removePokemonCards } from "./ui/card.ts";
import { renderModal } from "./ui/modal.ts";
import { fetchPokemonList, fetchPokemonInfo } from "./api/pokeApi.ts";
import { mapPokemon, mapPokemonList } from "./mappers/mappers.ts";

const limit = 16;
let offset = 0;
let pageNumber = 1;

async function displayPokemonList(): Promise<void> {
  try {
    const pokemonList = await fetchPokemonList(offset, limit);
    const mappedPokemon = mapPokemonList(pokemonList);
    renderPokemonList(mappedPokemon);
  } catch (error) {
    console.error("Failed to display Pokemon list:", error);
  }
}

function renderPokemonList(pokemonList: any) {
  const listLength: number = pokemonList.name.length;
  for (let i = 0; i < listLength; i++) {
    renderCard(pokemonList, i, addCardClickListener);
  }
}

export async function displayPokemonInfo(pokemon: string): Promise<void> {
  try {
    const pokemonData = await fetchPokemonInfo(pokemon);
    const mappedPokemon = mapPokemon(pokemonData);
    renderModal(mappedPokemon);
  } catch (error) {
    console.error("Failed to display Pokemon info:", error);
  }
}

export function addCardClickListener(cardElement: HTMLDivElement) {
  const handleClick = () => {
    const pokemonName: string = cardElement.dataset.name!;
    displayPokemonInfo(pokemonName);
  };
  cardElement.addEventListener("click", handleClick);
}

function managePrevButton(): void {
  const prevButton = <HTMLButtonElement>document.querySelector(".prev");
  prevButton.onclick = () => {
    if (offset !== 0) {
      showElement(loader);
      removePokemonCards();
      offset -= 16;
      pageNumber -= 1;
      hideBodyElements();
      displayPokemonList();
      showPageNumber(pageNumber);
    }
  };
}

function manageNextButton(): void {
  const nextButton = <HTMLButtonElement>document.querySelector(".next");
  nextButton.onclick = () => {
    showElement(loader);
    removePokemonCards();
    offset += 16;
    pageNumber += 1;
    hideBodyElements();
    displayPokemonList();
    showPageNumber(pageNumber);
  };
}

export function initialize() {
  showElement(loader);
  displayPokemonList();
  manageNextButton();
  managePrevButton();
  showPageNumber(pageNumber);
}
