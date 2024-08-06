export default interface IDatabaseConnection {
  query<T>(statement: string, parameters?: any[]): Promise<T[]>;
  queryScalar<T>(statement: string, parameters?: any[]): Promise<T>;
  execute(statement: string, parameters?: any[]): Promise<number>;
	close(): void;
  open(): void;
}
