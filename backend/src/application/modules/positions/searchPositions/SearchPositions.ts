import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import IPositionQuery from "@application/contracts/queries/IPositionQuery";
import { CriteriaRequest } from "@application/core/criteria/CriteriaRequest";
import SearchPositionsResponse from "./SearchPositionsResponse";
import ISearchPositions from "./ISearchPositions";
import { Criteria } from "@domain/core/criteria/Criteria";

@injectable()
export default class SearchPositions implements ISearchPositions {
  constructor(@inject(TYPES.IPositionQuery) readonly positionQuery: IPositionQuery) {
  }
  async get(criteriaRequest: CriteriaRequest): Promise<Result<SearchPositionsResponse[]>> {
    try {
      const criteria: Criteria = criteriaRequest.convertToCriteria();

      const positions: SearchPositionsResponse[] = await this.positionQuery.search(criteria);

      return Result.success(positions);
    } catch (error) {
      return Result.failure(["An exception was throwing"]);
    }
  }
}
