export class Pokemon {
  constructor(
    public name: string,
    public image: string,
    public type: string,
    public hp: number,
    public attack: number,
    public defense: number,
    public speed: number
  ) {
    this.name = name;
    this.image = image;
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
  }
}
