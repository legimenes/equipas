import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";

export default class PositionRepository implements IPositionRepository {
  constructor(readonly connection: IDatabaseConnection) {
  }

  async insert(position: Position): Promise<boolean> {
    const statement = `
      INSERT INTO Positions (
        name,
        zone,
        maximumPlayers
      )
      VALUES (
        $1,
        $2,
        $3
      )
    `;

    const parameters: any[] = [
      position.name,
      position.zone,
      position.maximumPositionPlayers
    ]

    const affectedRows = await this.connection.execute(statement, parameters);
    return (affectedRows > 1);
  }

  async get(): Promise<Position[]> {
    const statement = `
      SELECT
        name,
        zone,
        maximumPlayers
      FROM Positions
    `;
      
    const positions: Position[] = await this.connection.query(statement, undefined);
    this.connection.close();

    return positions;
  }
}