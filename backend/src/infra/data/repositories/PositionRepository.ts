import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";

export default class PositionRepository implements IPositionRepository {
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