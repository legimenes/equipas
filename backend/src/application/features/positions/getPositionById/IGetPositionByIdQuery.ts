import Result from "@domain/core/Result";
import GetPositionByIdResponse from "./GetPositionByIdResponse";

export default interface IGetPositionByIdQuery {
  get(id: number): Promise<Result<GetPositionByIdResponse>>;
}
