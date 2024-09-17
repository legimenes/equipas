import Result from "@domain/core/Result";
import GetPositionResponse from "./GetPositionResponse";

export default interface IGetPosition {
  get(id: number): Promise<Result<GetPositionResponse | undefined>>;
}
