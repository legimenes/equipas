import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import Position from "@domain/Position";
import GetPositionByIdResponse from "./GetPositionByIdResponse";
import IGetPositionById from "./IGetPositionById";

@injectable()
export default class GetPositionById implements IGetPositionById {
  constructor(@inject(TYPES.IPositionRepository) readonly positionRepository: IPositionRepository) {
  }

  async get(id: number): Promise<Result<GetPositionByIdResponse | undefined>> {
    try {
      const position: Position | undefined = await this.positionRepository.getById(id);

      return Result.success(position);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}
