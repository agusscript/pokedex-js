import { showBodyElements, hideElement, loader } from "./main";

type PokemonList = {
  name: string;
  url: string;
  id: number;
  image: string;
};

export function renderCard(
  pokemonList: PokemonList,
  index: number,
  callBackListener: Function
): void {
  showBodyElements();
  hideElement(loader);

  const cardsContainer = <HTMLDivElement>document.querySelector(".cards-container");
  const pokemonCard = <HTMLDivElement>document.createElement("div");
  const imageContainer = document.createElement("figure");
  const image = document.createElement("img");
  const name = document.createElement("figcaption");

  pokemonCard.classList.add("pokemon-card");
  pokemonCard.setAttribute("data-name", pokemonList.name[index]);
  name.textContent = pokemonList.name[index];
  image.setAttribute("src", pokemonList.image[index]);
  image.setAttribute("class", "pokemon-img");
  image.setAttribute("alt", pokemonList.name[index]);
  name.setAttribute("class", "pokemon-name");

  imageContainer.append(image, name);
  pokemonCard.appendChild(imageContainer);

  cardsContainer.appendChild(pokemonCard);

  callBackListener(pokemonCard);
}

export function removePokemonCards(): void {
  const pokemonCards = <HTMLDivElement>document.querySelector(".cards-container");
  while (pokemonCards.firstChild) {
    pokemonCards.removeChild(pokemonCards.firstChild);
  }
}
