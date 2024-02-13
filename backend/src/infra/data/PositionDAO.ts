import IPositionDAO from "@application/data/IPositionDAO";
import Position from "@domain/Position";
import IDatabaseConnection from "./IDatabaseConnection";

export default class PositionDAO implements IPositionDAO {
  constructor(readonly connection: IDatabaseConnection) {
  }

  async get(): Promise<Position[]> {
    const statement =
      `SELECT
        Name as name,
        Zone as zone,
        MaximumPositionPlayers as maximumPositionPlayers
      FROM Positions`;
      
    const positions: Position[] = await this.connection.query(statement, undefined);
    this.connection.close();

    return positions;
  }
}
