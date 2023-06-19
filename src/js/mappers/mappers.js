import { Pokemon } from "../entities/pokemon.js";

export function mapPokemon(apiData) {
  return new Pokemon(
    apiData.id,
    apiData.name,
    apiData.sprites.other["official-artwork"].front_default,
    apiData.types[0].type.name,
    apiData.stats[0].base_stat,
    apiData.stats[1].base_stat,
    apiData.stats[2].base_stat,
    apiData.stats[5].base_stat
  );
}
