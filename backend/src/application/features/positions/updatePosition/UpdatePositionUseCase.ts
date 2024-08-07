import Result from "@domain/core/Result";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";
import UpdatePositionRequest from "./UpdatePositionRequest";
import IUpdatePositionUseCase from "./IUpdatePositionUseCase";

export default class UpdatePositionUseCase implements IUpdatePositionUseCase {
  constructor(readonly positionRepository: IPositionRepository) {
  }

  async execute(id: number, request: UpdatePositionRequest): Promise<Result<boolean>> {
    try {
      const position: Position = Position.restore(
        id,
        request.name,
        request.zone,
        request.maximumPlayers);

        const wasUpdated: boolean = await this.positionRepository.update(position);
        if (!wasUpdated)
          return Result.failure(["There was a database failure"]);
      
      return Result.success(true);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}
