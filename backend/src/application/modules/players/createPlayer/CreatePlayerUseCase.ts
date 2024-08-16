import Result from "@domain/core/Result";
import IPlayerRepository from "@domain/repositories/IPlayerRepository";
import Player from "@domain/Player";
import CreatePlayerRequest from "./CreatePlayerRequest";
import ICreatePlayerUseCase from "./ICreatePlayerUseCase";

export default class CreatePlayerUseCase implements ICreatePlayerUseCase {
  constructor(readonly playerRepository: IPlayerRepository) {
  }

  async execute(request: CreatePlayerRequest): Promise<Result<boolean>> {
    try {
      const validateRequestResult = this.validateRequest(request);
      if (validateRequestResult.isFailure)
        return Result.failure(validateRequestResult.errors);
  
      const player : Player = Player.create(request.name, request.level, request.position);
      const playerInserted = await this.playerRepository.insert(player);
      if (!playerInserted) {
        return Result.failure(["There was a database failure"]);
      }
  
      return Result.success(true);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
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
