export default class Player {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly level: number,
    readonly position: string
  ) {
  }

  static create(
    name: string,
    level: number,
    position: string): Player {
    return new Player(0, name, level, position);
  }
}
