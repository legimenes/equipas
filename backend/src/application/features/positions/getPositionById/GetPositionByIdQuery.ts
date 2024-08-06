import Result from "@domain/core/Result";
import IPositionRepository from "@domain/repositories/IPositionRepository";
import GetPositionByIdResponse from "./GetPositionByIdResponse";
import IGetPositionByIdQuery from "./IGetPositionByIdQuery";

export default class GetPositionByIdQuery implements IGetPositionByIdQuery {
  constructor(readonly positionRepository: IPositionRepository) {
  }

  async get(id: number): Promise<Result<GetPositionByIdResponse>> {
    try {
      const position: any = await this.positionRepository.getById(id);

      return Result.success(position);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}
