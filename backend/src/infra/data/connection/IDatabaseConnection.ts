export default interface IDatabaseConnection {
  query<T>(statement: string, params?: any[]): Promise<T[]>;
  queryScalar<T>(statement: string, params?: any[]): Promise<T>;
  execute(statement: string, params?: any[]): Promise<number>;
	close(): void;
  open(): void;
}
