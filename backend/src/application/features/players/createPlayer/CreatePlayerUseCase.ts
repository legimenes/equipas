import Result from "@domain/core/Result";
import Player from "@domain/Player";
import IPlayerRepository from "@domain/repositories/IPlayerRepository";
import { CreatePlayerRequest } from "./CreatePlayerRequest";
import ICreatePlayerUseCase from "./ICreatePlayerUseCase";

export default class CreatePlayerUseCase implements ICreatePlayerUseCase {
  constructor(readonly playerRepository: IPlayerRepository) {
  }

  async execute(request: CreatePlayerRequest): Promise<Result<boolean>> {
    const validateRequestResult = this.validateRequest(request);
    if (validateRequestResult.isFailure)
      return Result.failure(validateRequestResult.getErrors());

    const player : Player = Player.create(request.name, request.level, request.position);
    // TODO: descomentar
    //await this.playerRepository.insert(player);

    return Result.success(true);
  }

  private validateRequest(request: CreatePlayerRequest): Result<boolean> {
    if (request.name === null) {
      return Result.failure(["Player name is required."]);
    }
    if (request.level == 0) {
      return Result.failure(["Player level is required."]);
    }
    if (request.position === null) {
      return Result.failure(["Player position is required."]);
    }

    return Result.success(true);
  }
}
