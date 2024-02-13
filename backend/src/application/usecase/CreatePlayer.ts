import Player from "@domain/Player";
import ICreatePlayer from "./ICreatePlayer";
import IPlayerDAO from "@application/data/IPlayerDAO";

export default class CreatePlayer implements ICreatePlayer {
  constructor(readonly playerDAO: IPlayerDAO) {
  }

  async execute(player: Player): Promise<boolean> {
    this.validatePlayer(player);

    await this.playerDAO.insert(player);

    return true;
  }

  private validatePlayer(player: Player): void {
    if (player.name === null) {
      throw new Error("Player name is required.");
    }
    if (player.level == 0) {
      throw new Error("Player level is required.");
    }
    if (player.position === null) {
      throw new Error("Player position is required.");
    }
  }
}
