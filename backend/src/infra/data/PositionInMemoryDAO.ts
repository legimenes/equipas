import IPositionDAO from "@application/data/IPositionDAO";
import Position from "@domain/Position";

export default class PositionDAOInMemory implements IPositionDAO {

  async get(): Promise<Position[]> {
    return Promise.resolve().then(() => {
      const positions: Position[] = [];
      positions[2] = new Position('G', 1, 1);
      positions[3] = new Position('D', 2, undefined);
      positions[0] = new Position('M', 3, undefined);
      positions[1] = new Position('A', 4, undefined);

      positions.sort((a, b) => a.zone - b.zone);

      return positions;
    });
  }
}
