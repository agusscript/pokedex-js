export class Pokemon {
  constructor(
    public name: string,
    public type: string,
    public hp: number,
    public attack: number,
    public defense: number,
    public speed: number,
    public specialAttack: number,
    public specialDefense: number
  ) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
  }
}
