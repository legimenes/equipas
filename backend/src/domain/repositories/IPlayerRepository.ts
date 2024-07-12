import Player from "@domain/Player";

export default interface IPlayerRepository {
  insert(player: Player): Promise<boolean>;
  update(player: Player): Promise<void>;
  delete(playerId: number): Promise<void>;
  getById(playerId: number): Promise<Player>;
  //get(): Promise<Player[]>;
}
