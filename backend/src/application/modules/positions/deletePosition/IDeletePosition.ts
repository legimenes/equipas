import Result from "@domain/core/Result";

export default interface IDeletePosition {
  execute(id: number): Promise<Result<boolean>>;
}
