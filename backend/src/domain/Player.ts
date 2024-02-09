export default class Player {
  private constructor(
    readonly name: string,
    readonly level: number,
    readonly position: string
  ) {
  }

  static create(
    name: string,
    level: number,
    position: string): Player {
    return new Player(name, level, position);
  }
}
