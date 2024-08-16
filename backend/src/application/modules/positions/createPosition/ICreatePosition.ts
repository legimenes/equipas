import Result from "@domain/core/Result";
import CreatePositionRequest from "./CreatePositionRequest";

export default interface ICreatePosition {
  execute(request: CreatePositionRequest): Promise<Result<boolean>>;
}
