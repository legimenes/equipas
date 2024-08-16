import Result from "@domain/core/Result";
import UpdatePositionRequest from "./UpdatePositionRequest";

export default interface IUpdatePosition {
  execute(id: number, request: UpdatePositionRequest): Promise<Result<boolean>>;
}
