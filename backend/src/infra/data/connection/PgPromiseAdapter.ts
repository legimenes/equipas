import { injectable } from "inversify";
import IDatabaseConnection from "./IDatabaseConnection";
//import pgp from "pg-promise";
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const connectionOptions = {
  host: 'localhost',
  port: 5444,
  database: 'equipas',
  user: 'postgres',
  password: 'pass@word',
  max: 10,
  idleTimeoutMillis: 30000
};

@injectable()
export default class PgPromiseAdapter implements IDatabaseConnection {
  private connection: any;

  constructor () {
		//this.connection = pgp()("postgres://postgres:pass@word@localhost:5444/equipas");
    this.connection = pgp(connectionOptions);
	}

  async query<T>(statement: string, parameters?: any[] | undefined): Promise<T[]> {
    try {
      statement = statement.replace(/\s+/g, ' ').trim();
      const result = await this.connection.any(statement, parameters);
      return result;
    } catch (error) {
      throw new Error('Error when executing the query.');
    }
  }

  async queryScalar<T>(statement: string, parameters?: any[] | undefined): Promise<T> {
    try {
      statement = statement.replace(/\s+/g, ' ').trim();
      const result = await this.connection.oneOrNone(statement, parameters);
      return result;
    } catch (error) {
      throw new Error('Error when executing the query.');
    }
  }

  async execute(statement: string, parameters?: any[] | undefined): Promise<number> {
    try {
      statement = statement.replace(/\s+/g, ' ').trim();
      const result = await this.connection.result(statement, parameters);
      return result.rowCount;
    } catch (error) {
      throw new Error('Error when executing the query.');
    }
  }

  close(): void {
    //this.connection.$pool.end();
    //throw new Error("Method not implemented.");
  }

  open(): void {
    throw new Error("Method not implemented.");
  }
}
