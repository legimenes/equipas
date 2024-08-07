import IDatabaseConnection from "./IDatabaseConnection";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements IDatabaseConnection {
  private connection: any;

  constructor () {
		this.connection = pgp()("postgres://postgres:pass@word@localhost:5444/equipas");
	}

  query<T>(statement: string, parameters?: any[] | undefined): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  async queryScalar<T>(statement: string, parameters?: any[] | undefined): Promise<T> {
    try {
      const result = await this.connection.oneOrNone(statement, parameters);
      return result;
    } catch (error) {
      throw new Error('Error when executing the query.');
    }
  }

  async execute(statement: string, parameters?: any[] | undefined): Promise<number> {
    try {
      const result = await this.connection.result(statement, parameters);
      return result.rowCount;
    } catch (error) {
      throw new Error('Error when executing the query.');
    }
  }

  close(): void {
    //this.connection.$pool.end();
    throw new Error("Method not implemented.");
  }

  open(): void {
    throw new Error("Method not implemented.");
  }
}
