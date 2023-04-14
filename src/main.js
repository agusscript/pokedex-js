const POKE_API = "https://pokeapi.co/api/v2";
const $cardsContainer = document.querySelector(".cards-container");

function getPokemonList(offset, limit) {
  return fetch(`${POKE_API}/pokemon/?offset=${offset}&limit=${limit}`).then(
    (response) => response.json()
  );
}

function getPokemonInfo(pokemon) {
  return fetch(`${POKE_API}/pokemon/${pokemon}`).then((response) =>
    response.json()
  );
}

function showPokemonList() {
  getPokemonList(0, 20).then((response) => {
    console.log(response);

    for (let i = 0; i < response.results.length; i++) {
      getPokemonInfo(response.results[i].name).then((pokemonInfo) => {
        // console.log(pokemonInfo);

        const pokemonName = response.results[i].name;
        let pokemonCard = document.createElement("div");
        let pokemonImageContainer = document.createElement("figure");
        let pokemonCardImage = document.createElement("img");
        let pokemonCardName = document.createElement("figcaption");

        pokemonCardImage.setAttribute(
          "src",
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`
        );
        pokemonCardImage.setAttribute("alt", pokemonName);
        pokemonCardName.textContent = pokemonName;

        pokemonImageContainer.append(pokemonCardImage, pokemonCardName);
        pokemonCard.append(pokemonImageContainer);
        $cardsContainer.append(pokemonCard);
        // mostrar stats cuando se de vuelta la card
      });
    }
  });
}

showPokemonList();
