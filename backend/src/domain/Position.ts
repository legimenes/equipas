export default class Position {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly zone: number,
    readonly maximumPlayers?: number
  ) {
  }

  static create(
    name: string,
    zone: number,
    maximumPlayers?: number): Position {
    return new Position(0, name, zone, maximumPlayers);
  }

  static restore(
    id: number,
    name: string,
    zone: number,
    maximumPlayers?: number): Position {
    return new Position(id, name, zone, maximumPlayers);
  }
}
