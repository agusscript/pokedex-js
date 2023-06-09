import { Pokemon } from "../entities/pokemon.ts";
import { PokemonList } from "../entities/pokemonList.ts";
import { PokemonInfo, ListPokemons, Result } from "./types.ts";

export function mapPokemon(apiData: PokemonInfo): Pokemon {
  const name: string = apiData.name;
  const type: string = apiData.types[0].type.name;
  const hp: number = apiData.stats[0].base_stat;
  const attack: number = apiData.stats[1].base_stat;
  const defense: number = apiData.stats[2].base_stat;
  const speed: number = apiData.stats[5].base_stat;
  const specialAttack: number = apiData.stats[3].base_stat;
  const specialDefense: number = apiData.stats[4].base_stat;

  const pokemon = new Pokemon(
    name,
    type,
    hp,
    attack,
    defense,
    speed,
    specialAttack,
    specialDefense
  );

  return pokemon;
}

export function mapPokemonList(apiData: ListPokemons): PokemonList {
  const name = apiData.results.map((pokemon: Result) => pokemon.name);
  const url = apiData.results.map((pokemon: Result) => pokemon.url);
  const id = url.map((url: string) => extractId(url));
  const image = id.map((id: string) => {
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return pokemonImage;
  });

  const pokemonList = new PokemonList(name, image);

  return pokemonList;
}

function extractId(url: string): string {
  const urlParts = url.split("/");
  const id = urlParts[urlParts.length - 2];
  return id;
}
