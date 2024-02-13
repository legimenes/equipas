import Player from "@domain/Player";

export default interface ICreatePlayer {
  execute(player: Player): Promise<boolean>;
}
