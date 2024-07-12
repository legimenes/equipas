import IDatabaseConnection from "./IDatabaseConnection";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements IDatabaseConnection {
  private connection: any;

  constructor () {
		this.connection = pgp()("postgres://postgres:pass@word@localhost:5444/equipas");
	}

  query<T>(statement: string, params?: any[] | undefined): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
  queryScalar<T>(statement: string, params?: any[] | undefined): Promise<T> {
    throw new Error("Method not implemented.");
  }
  async execute(statement: string, params?: any[] | undefined): Promise<number> {
    try {
      return await this.connection.result(statement, params);
    } catch (error) {
      throw new Error('Error when executing the query.');
    }
  }
  close(): void {
    throw new Error("Method not implemented.");
  }
  open(): void {
    throw new Error("Method not implemented.");
  }
}