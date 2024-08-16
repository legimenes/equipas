import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import IDeletePosition from "./IDeletePosition";

@injectable()
export default class DeletePosition implements IDeletePosition {
  constructor(@inject(TYPES.IPositionRepository) readonly positionRepository: IPositionRepository) {
  }
  
  async execute(id: number): Promise<Result<boolean>> {
    try {
      const wasDeleted: boolean = await this.positionRepository.delete(id);
      if (!wasDeleted)
        return Result.failure(["There was a database failure"]);
      
      return Result.success(true);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}
