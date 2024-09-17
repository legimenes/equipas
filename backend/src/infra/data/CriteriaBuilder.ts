import { injectable } from "inversify";
import { Criteria } from "@domain/core/criteria/Criteria";
import { Operator } from "@domain/core/criteria/Operator";

type CriteriaQuery = {
  query: string,
  parameters: any[]
}

@injectable()
class CriteriaBuilder {
  constructor() {
  }

  public buildQuery(criteria: Criteria): CriteriaQuery {
    const parameters: any[] = [];
    const criteriaQueries: string[] = [];
    
    criteria.filters.filters.forEach(filter => {
      let value: string = filter.operator.value === Operator.CONTAINS || filter.operator.value === Operator.NOT_CONTAINS
        ? `%${filter.value.value}%`
        : filter.value.value;

      parameters.push(value);
      if (filter.operator.value === Operator.CONTAINS) {
        criteriaQueries.push(`${filter.field.value} LIKE $${parameters.length}`);
      }
      else if (filter.operator.value === Operator.NOT_CONTAINS) {
        criteriaQueries.push(`${filter.field.value} NOT LIKE $${parameters.length}`);
      }
      else if (filter.operator.value === Operator.NOT_EQUAL) {
        criteriaQueries.push(`${filter.field.value} <> $${parameters.length}`);
      }
      else {
        criteriaQueries.push(`${filter.field.value} ${filter.operator.value} $${parameters.length}`);
      }
    });
    
    const criteriaQuery: CriteriaQuery = {
      query: criteriaQueries.join(' AND '),
      parameters: parameters
    };

    return criteriaQuery;
  }
}

export {
  CriteriaQuery,
  CriteriaBuilder
};
