import Position from "@domain/Position";

export default interface IPositionDAO {
  get(): Promise<Position[]>
}
