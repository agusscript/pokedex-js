const POKE_API = "https://pokeapi.co/api/v2";

function getPokemonList(offset, limit) {
  return fetch(`${POKE_API}/pokemon/?offset=${offset}&limit=${limit}`).then(
    (response) => response.json()
  );
}

function showPokemonList() {
  getPokemonList(0, 20).then((response) => {
    console.log(response);

    for (let i = 0; i < response.results.length; i++) {
      let pokemonCard = document.createElement("div");
      pokemonCard.textContent = response.results[i].name; //show name and img pokemon
      document.querySelector(".cards-container").append(pokemonCard);
      //response.results[i].url  fetchear esto cuando se de vuelta la card
    }
  });
}

showPokemonList();
