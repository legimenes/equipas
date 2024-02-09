import Position from '@domain/Position';
import sqlite3 from 'sqlite3';
import IDatabaseConnection from './IDatabaseConnection';

export default class PositionDAO2 {
  private connection2: sqlite3.Database;

  constructor(readonly connection: IDatabaseConnection) {
    this.connection2 = new sqlite3.Database('C:/workspace/repos/LGG/equipas/backend/database/equipas.db');
  }

  async get(): Promise<Position[]> {
    const statement =
      'SELECT Name as name, Zone as zone, MaximumPositionPlayers ' +
      'as maximumPositionPlayers FROM Positions';

    return await this.connection.query(statement, undefined);
  }
}
