import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import IPlayerRepository from "@domain/repositories/IPlayerRepository";
import Player from "@domain/Player";

export default class PlayerRepository implements IPlayerRepository {
  constructor(readonly connection: IDatabaseConnection) {
  }

  async insert(player: Player): Promise<boolean> {
    const statement = `
      INSERT INTO Players (
        Name,
        Level,
        Position
      )
      VALUES (
        $1,
        $2,
        $3
      )
    `;
    
    const params: any[] = [
      player.name,
      player.level,
      player.position
    ]

    const affectedRows = await this.connection.execute(statement, params);
    return (affectedRows > 1);
  }

  async update(player: Player): Promise<void> {
    const statement = `
      UPDATE Players SET
      Name = ?,
      Level = ?,
      Position = ?
      WHERE Id = ?
    `;
    
    const params: any[] = [
      player.name,
      player.level,
      player.position,
      player.id
    ]

    await this.connection.execute(statement, params);
  }

  async delete(playerId: number): Promise<void> {
    const deleteStatement = `DELETE FROM Players WHERE Id = ?`;

    await this.connection.execute(deleteStatement, [playerId]);
  }

  async get(): Promise<Player[]> {
    const statement =
    `SELECT
      Id as id,
      Name as name,
      Level as level,
      Position as position
    FROM Players`;
      
    const players: Player[] = await this.connection.query(statement, undefined);
    this.connection.close();

    return players;
  }

  async getById(playerId: number): Promise<Player> {
    const statement =
    `SELECT
      Id as id,
      Name as name,
      Level as level,
      Position as position
    FROM Players
    WHERE Id = ?`;
      
    const player: Player = await this.connection.queryScalar(statement, [playerId]);
    this.connection.close();

    return player;
  }
}
