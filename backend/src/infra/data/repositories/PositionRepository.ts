import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";

export default class PositionRepository implements IPositionRepository {
  constructor(readonly connection: IDatabaseConnection) {
  }

  async getById(id: number): Promise<Position | undefined> {
    const statement = `
      select
        id,
        name,
        zone,
        maximumPlayers
      from positions
      where
        id = $1
    `;

    const parameters: any[] = [
      id
    ]
      
    const position: Position = await this.connection.queryScalar(statement, parameters);

    return position;
  }

  async insert(position: Position): Promise<boolean> {
    const statement = `
      insert into positions (
        name,
        zone,
        maximumPlayers
      )
      values (
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
    return (affectedRows > 0);
  }

  async update(position: Position): Promise<boolean> {
    const statement = `
      update positions set
        name = $1,
        zone = $2,
        maximumPlayers = $3
      where
        id = $4
    `;

    const parameters: any[] = [
      position.name,
      position.zone,
      position.maximumPositionPlayers,
      position.id
    ]

    const affectedRows = await this.connection.execute(statement, parameters);
    return (affectedRows > 0);
  }
}
