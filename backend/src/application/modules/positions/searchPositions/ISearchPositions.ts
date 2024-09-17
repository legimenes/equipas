import Result from "@domain/core/Result";
import { CriteriaRequest } from "@application/core/criteria/CriteriaRequest";
import SearchPositionsResponse from "./SearchPositionsResponse";

export default interface ISearchPositions {
  get(criteriaRequest: CriteriaRequest): Promise<Result<SearchPositionsResponse[]>>;
}
