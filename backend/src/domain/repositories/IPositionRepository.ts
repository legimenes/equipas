import Position from "@domain/Position";

export default interface IPositionRepository {
  insert(position: Position): Promise<boolean>;
  getById(id: number): Promise<Position | undefined>;
}
