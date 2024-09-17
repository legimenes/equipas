import SearchPositionsResponse from "@application/modules/positions/searchPositions/SearchPositionsResponse";
import { Criteria } from "@domain/core/criteria/Criteria";

export default interface IPositionQuery {
  search(criteria: Criteria): Promise<SearchPositionsResponse[]>;
}
