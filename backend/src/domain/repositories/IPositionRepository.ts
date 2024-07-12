import Position from "@domain/Position";

export default interface IPositionRepository {
  get(): Promise<Position[]>;
}
