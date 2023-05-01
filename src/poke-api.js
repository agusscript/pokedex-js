const POKE_API = "https://pokeapi.co/api/v2";

export function getPokemonList(offset, limit) {
  return fetch(`${POKE_API}/pokemon/?offset=${offset}&limit=${limit}`).then(
    (response) => response.json()
  );
}

export function getPokemonInfo(pokemon) {
  return fetch(`${POKE_API}/pokemon/${pokemon}`).then((response) =>
    response.json()
  );
}
