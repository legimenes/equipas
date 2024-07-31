import Position from "@domain/Position";

export default interface IPositionRepository {
  insert(position: Position): Promise<boolean>;
  get(): Promise<Position[]>;
}
