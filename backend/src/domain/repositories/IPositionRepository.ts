import Position from "@domain/Position";

export default interface IPositionRepository {
  insert(position: Position): Promise<boolean>;
  update(position: Position): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<Position | undefined>;
}
