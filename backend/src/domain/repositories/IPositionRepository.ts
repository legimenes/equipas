import Position from "@domain/Position";

export default interface IPositionRepository {
  getById(id: number): Promise<Position | undefined>;
  insert(position: Position): Promise<boolean>;
  update(position: Position): Promise<boolean>;
}
