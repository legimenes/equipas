import Player from "@domain/Player";
import IPlayerDAO from "@application/ports/driven/IPlayerDAO";
import { CreatePlayerInput } from "@application/ports/driver/CreatePlayerInput";
import ICreatePlayer from "@application/ports/driver/ICreatePlayer";

export default class CreatePlayer implements ICreatePlayer {
  constructor(readonly playerDAO: IPlayerDAO) {
  }

  async execute(input: CreatePlayerInput): Promise<boolean> {
    this.validateInput(input);

    const player: Player = Player.create(input.name, input.level, input.position);
    await this.playerDAO.insert(player);

    return true;
  }

  private validateInput(input: CreatePlayerInput): void {
    if (input.name === null) {
      throw new Error("Player name is required.");
    }
    if (input.level == 0) {
      throw new Error("Player level is required.");
    }
    if (input.position === null) {
      throw new Error("Player position is required.");
    }
  }
}
