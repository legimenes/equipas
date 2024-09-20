import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import Result from "@domain/core/Result";
import { CriteriaRequest, FilterType } from "@application/core/criteria/CriteriaRequest";
import SearchPositionsResponse from "./SearchPositionsResponse";
import ISearchPositions from "./ISearchPositions";

@injectable()
export default class SearchPositionsEndpoint {
  constructor(@inject(TYPES.ISearchPositions) readonly query: ISearchPositions) {
  }

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const { query: queryParams } = request;
      const criteriaRequest: CriteriaRequest = new CriteriaRequest(
        queryParams.filters as FilterType[],
        queryParams.orderBy as string || undefined,
        queryParams.order as string || undefined,
        queryParams.limit as string || undefined,
        queryParams.offset as string || undefined
      );

      const result: Result<SearchPositionsResponse[]> = await this.query.get(criteriaRequest);
      if (result.isFailure) {
        response.status(422).json(result);
      }

      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
