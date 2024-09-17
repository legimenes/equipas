import { inject, injectable } from "inversify";
import { TYPES } from "@infra/di/types";
import IDatabaseConnection from "@infra/data/connection/IDatabaseConnection";
import IPositionQuery from "@application/contracts/queries/IPositionQuery";
import SearchPositionsResponse from "@application/modules/positions/searchPositions/SearchPositionsResponse";
import { Criteria } from "@domain/core/criteria/Criteria";
import { CriteriaBuilder, CriteriaQuery } from "../CriteriaBuilder";

@injectable()
export default class PositionQuery implements IPositionQuery {
  constructor(
    @inject(TYPES.IDatabaseConnection) readonly connection: IDatabaseConnection,
    readonly criteriaBuilder: CriteriaBuilder) {
  }

  async search(criteria: Criteria): Promise<SearchPositionsResponse[]> {
    const baseStatement = `
      select
        id,
        name,
        zone,
        maximumPlayers
      from positions
    `;

    const criteriaQuery: CriteriaQuery = this.criteriaBuilder.buildQuery(criteria);

    const statement: string = `${baseStatement} WHERE ${criteriaQuery.query}`
    const parameters: any[] = criteriaQuery.parameters;

    const positions: SearchPositionsResponse[] = await this.connection.query(statement, parameters);
    return positions;
  }
}
