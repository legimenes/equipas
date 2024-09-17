import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";
import GetPositionResponse from "./GetPositionResponse";
import IGetPosition from "./IGetPosition";

@injectable()
export default class GetPosition implements IGetPosition {
  constructor(@inject(TYPES.IPositionRepository) readonly positionRepository: IPositionRepository) {
  }

  async get(id: number): Promise<Result<GetPositionResponse | undefined>> {
    try {
      const position: Position | undefined = await this.positionRepository.getById(id);

      return Result.success(position);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}
