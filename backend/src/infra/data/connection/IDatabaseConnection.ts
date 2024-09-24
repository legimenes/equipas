export default interface IDatabaseConnection {
  query(statement: string, parameters?: any[]): Promise<any[]>;
  queryScalar<T>(statement: string, parameters?: any[]): Promise<any>;
  execute(statement: string, parameters?: any[]): Promise<number>;
	close(): void;
  open(): void;
}
