import sqlite3 from 'sqlite3';
import IDatabaseConnection from './IDatabaseConnection';

export default class Sqlite3Adapter implements IDatabaseConnection {
  private connection: sqlite3.Database;

  constructor() {
    this.connection = new sqlite3.Database('C:/workspace/repos/LGG/equipas/backend/database/equipas.db');
  }

  query<T>(statement: string, params: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.open();
      this.connection.all(statement, params, (err: any, rows: T[]) => {
        this.close();
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  queryScalar<T>(statement: string, params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.open();
      this.connection.get(statement, params, (err: any, row: T) => {
        this.close();
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  execute(statement: string, params: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.open();
      this.connection.run(statement, params, (err: any) => {
        this.close();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close(): void {
    this.connection.close((err) => {
      if (err) {
        //console.error(err.message);
      }
    });
  }

  open(): void {
    this.connection = new sqlite3.Database('C:/workspace/repos/LGG/equipas/backend/database/equipas.db');
    // this.connection.on('open', () => {
    //   console.log('connection opened');
    // });
  }
}
