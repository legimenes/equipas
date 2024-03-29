import Player from "@domain/Player";

export default interface IPlayerDAO {
  insert(player: Player): Promise<void>;
  update(player: Player): Promise<void>;
  delete(playerId: number): Promise<void>;
  get(): Promise<Player[]>;
  getScalar(playerId: number): Promise<Player>;
}
