export default class Position {
  constructor(
    readonly name: string,
    readonly zone: number,
    readonly maximumPositionPlayers?: number
  ) {
  }

  static create(
    name: string,
    zone: number,
    maximumPositionPlayers?: number): Position {
    return new Position(name, zone, maximumPositionPlayers);
  }
}
