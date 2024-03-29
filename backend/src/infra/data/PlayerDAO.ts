import IPlayerDAO from "@application/ports/driven/IPlayerDAO";
import Player from "@domain/Player";
import IDatabaseConnection from "./IDatabaseConnection";

export default class PlayerDAO implements IPlayerDAO {
  constructor(readonly connection: IDatabaseConnection) {
  }

  async insert(player: Player): Promise<void> {
    const statement = `
      INSERT INTO Players
      (Name, Level, Position)
      VALUES (?, ?, ?)
    `;
    
    const params: any[] = [
      player.name,
      player.level,
      player.position
    ]

    await this.connection.execute(statement, params);
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

  async getScalar(playerId: number): Promise<Player> {
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
