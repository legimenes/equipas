import Result from "@domain/core/Result";
import { CreatePlayerRequest } from "./CreatePlayerRequest";


export default interface ICreatePlayerUseCase {
  execute(request: CreatePlayerRequest): Promise<Result<boolean>>;
}