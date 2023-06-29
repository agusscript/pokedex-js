const POKE_API = "https://pokeapi.co/api/v2";

export function getPokemonList(offset, limit) {
  const apiUrl = `${POKE_API}/pokemon/?offset=${offset}&limit=${limit}`;
  return fetch(apiUrl).then((response) => response.json());
}

export function getPokemonInfo(pokemon) {
  const apiPokemon = `${POKE_API}/pokemon/${pokemon}`;
  return fetch(apiPokemon).then((response) => response.json());
}
