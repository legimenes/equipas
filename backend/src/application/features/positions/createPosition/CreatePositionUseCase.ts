import Result from "@domain/core/Result";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";
import CreatePositionRequest from "./CreatePositionRequest";
import ICreatePositionUseCase from "./ICreatePositionUseCase";

export default class CreatePositionSchema implements ICreatePositionUseCase {
  constructor(readonly positionRepository: IPositionRepository) {
  }

  async execute(request: CreatePositionRequest): Promise<Result<boolean>> {
    try {
      const position: Position = Position.create(request.name, request.zone, request.maximumPlayers);
      const wasInserted: boolean = await this.positionRepository.insert(position);
      if (!wasInserted)
        return Result.failure(["There was a database failure"]);

      return Result.success(true);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}