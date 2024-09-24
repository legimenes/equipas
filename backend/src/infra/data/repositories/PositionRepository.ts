import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";

@injectable()
export default class PositionRepository implements IPositionRepository {

  constructor(@inject(TYPES.IDatabaseConnection) readonly connection: IDatabaseConnection) {
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
      position.maximumPlayers
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
      position.maximumPlayers,
      position.id
    ]

    const affectedRows = await this.connection.execute(statement, parameters);
    return (affectedRows > 0);
  }

  async delete(id: number): Promise<boolean> {
    const statement = `
      delete from positions
      where
        id = $1
    `;

    const parameters: any[] = [
      id
    ]

    const affectedRows = await this.connection.execute(statement, parameters);
    return (affectedRows > 0);
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
    ];
    const record: any = await this.connection.queryScalar(statement, parameters);
    const position: Position = Position.restore(record.id, record.name, record.zone, record.maximumplayers);
    return position;
  }

}
