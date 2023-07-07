import { overlay, body, hideElement, showElement } from "./main";
import { Pokemon } from "../entities/pokemon";
import { typeColors } from "./type-colors";

function createStatBar(stat: string, pokemon: Pokemon, modal: HTMLElement): void {
  const statContainer = document.createElement("div");
  const statBar = document.createElement("div");
  const selectedStat = document.createElement("div");
  const textStatContainer = document.createElement("p");
  const numberStat = document.createElement("span");

  const pokemonStat = pokemon[stat as keyof Pokemon];

  selectedStat.style.width = `${pokemonStat}%`;
  textStatContainer.textContent = stat;
  numberStat.textContent = pokemonStat.toString();

  statContainer.setAttribute("class", "stat-container");
  statBar.setAttribute("class", "stat-bar");
  selectedStat.setAttribute("class", `${stat}-bar`);

  textStatContainer.appendChild(numberStat);
  statBar.appendChild(selectedStat);
  statContainer.append(textStatContainer, statBar);
  modal.append(statContainer);
}

function createModal(pokemon: Pokemon): void {
  const modalContainer = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeButton = document.createElement("button");
  const closeImage = document.createElement("img");
  const name = document.createElement("h2");
  const type = document.createElement("p");

  name.textContent = pokemon.name;
  type.textContent = pokemon.type;
  type.style.background = typeColors[pokemon.type];
  modalContainer.setAttribute("class", "modal-container open");
  modalContent.setAttribute("class", "modal-content");
  closeButton.setAttribute("class", "close-btn");
  closeImage.setAttribute("class", "close-img");
  name.setAttribute("class", "pokemon-name");
  type.setAttribute("class", "pokemon-type");
  closeImage.setAttribute(
    "src",
    "https://raw.githubusercontent.com/agusscript/pokedex-js/a6cdaef0779210b9d0d7bdf99fc21a0c6ed57243/assets/images/icon-close-menu.svg"
  );

  closeButton.appendChild(closeImage);
  modalContent.append(closeButton, name, type);
  modalContainer.appendChild(modalContent);
  body.appendChild(modalContainer);

  createStatBar("hp", pokemon, modalContent);
  createStatBar("attack", pokemon, modalContent);
  createStatBar("defense", pokemon, modalContent);
  createStatBar("speed", pokemon, modalContent);
  createStatBar("specialAttack", pokemon, modalContent);
  createStatBar("specialDefense", pokemon, modalContent);

  closeButton.onclick = () => {
    modalContainer.classList.add("close");
    hideElement(overlay);
  };

  overlay.onclick = () => {
    modalContainer.classList.add("close");
    hideElement(overlay);
  };
}

export function renderModal(pokemon: Pokemon): void {
  showElement(overlay);
  createModal(pokemon);
}
