import Result from "@domain/core/Result";
import GetPositionByIdResponse from "./GetPositionByIdResponse";

export default interface IGetPositionById {
  get(id: number): Promise<Result<GetPositionByIdResponse | undefined>>;
}
