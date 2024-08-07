export default class Position {
  private constructor(
    readonly id: number,
    readonly name: string,
    readonly zone: number,
    readonly maximumPositionPlayers?: number
  ) {
  }

  static create(
    name: string,
    zone: number,
    maximumPositionPlayers?: number): Position {
    return new Position(0, name, zone, maximumPositionPlayers);
  }

  static restore(
    id: number,
    name: string,
    zone: number,
    maximumPositionPlayers?: number): Position {
    return new Position(id, name, zone, maximumPositionPlayers);
  }
}
