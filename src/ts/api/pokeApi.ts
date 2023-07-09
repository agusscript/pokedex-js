import { PokemonInfo, ListPokemons } from "../mappers/types";

const POKE_API = "https://pokeapi.co/api/v2";

export function fetchPokemonList(offset: number, limit: number): Promise<ListPokemons> {
  const apiUrl = `${POKE_API}/pokemon/?offset=${offset}&limit=${limit}`;
  return fetch(apiUrl).then((response) => response.json());
}

export function fetchPokemonInfo(pokemon: string): Promise<PokemonInfo> {
  const apiPokemon = `${POKE_API}/pokemon/${pokemon}`;
  return fetch(apiPokemon).then((response) => response.json());
}
