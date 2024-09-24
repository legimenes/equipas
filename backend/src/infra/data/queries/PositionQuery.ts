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
        maximumplayers
      FROM positions
    `;
    const criteriaQuery: CriteriaQuery = this.criteriaBuilder.buildQuery(criteria, baseStatement);
    const statement: string = criteriaQuery.query;
    const parameters: any[] = criteriaQuery.parameters;
    const records: any[] = await this.connection.query(statement, parameters);
    const positions: SearchPositionsResponse[] = records.map(record => ({
      id: record.id,
      zone: record.zone,
      name: record.name,
      maximumPlayers: record.maximumplayers
    }));
    return positions;
  }

}