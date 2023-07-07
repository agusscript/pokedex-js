export type PokemonInfo = {
  name: string;
  stats: Stat[];
  types: Type[];
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: Stat2;
};

type Stat2 = {
  name: string;
  url: string;
};

type Type = {
  slot: number;
  type: Type2;
};

type Type2 = {
  name: string;
  url: string;
};

export type ListPokemons = {
  count: number;
  next: string;
  previous: string;
  results: Result[];
};

export type Result = {
  name: string;
  url: string;
};
