import { fetchPokemonList, fetchPokemonInfo } from "./api/pokeApi.ts";
import { mapPokemon, mapPokemonList } from "./mappers/mappers.ts";
import {
  renderCard,
  removePokemonCards,
  showPageNumber,
  hideBodyElements,
  showElement,
  loader,
} from "./ui/main.ts";

const limit = 16;
let offset = 0;
let pageNumber = 1;

async function displayPokemonList(): Promise<void> {
  const pokemonList = await fetchPokemonList(offset, limit);

  const mappedPokemon = mapPokemonList(pokemonList);
  renderPokemonList(mappedPokemon);
}

function renderPokemonList(pokemonList: any) {
  const listLength: number = pokemonList.name.length;
  for (let i = 0; i < listLength; i++) {
    renderCard(pokemonList, i, addCardClickListener);
  }
}

export async function displayPokemonInfo(pokemon: string): Promise<void> {
  fetchPokemonInfo(pokemon).then((pokemon) => {
    const mappedPokemon = mapPokemon(pokemon);
    console.log(mappedPokemon);
  });
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
