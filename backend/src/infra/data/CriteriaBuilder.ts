import { injectable } from "inversify";
import { Criteria } from "@domain/core/criteria/Criteria";
import { Filter } from "@domain/core/criteria/Filter";
import { Operator } from "@domain/core/criteria/Operator";
import { Order } from "@domain/core/criteria/Order";

type CriteriaQuery = {
  query: string,
  parameters: any[]
}

@injectable()
class CriteriaBuilder {

  buildQuery(criteria: Criteria, baseQuery: string): CriteriaQuery {
    const parameters: any[] = this.assignParameters(criteria.filters.filters);
    const conditions: string = this.assingConditions(criteria.filters.filters);
    const order: string = this.assignOrder(criteria.order);
    const hasFilters: boolean = (criteria.filters.filters.length > 0);
    let query: string = this.assignBaseQuery(baseQuery, hasFilters);
    query = `${query} ${conditions} ${order}`.replace(/\s+/g, ' ').trim();
    const criteriaQuery: CriteriaQuery = {
      query: query,
      parameters: parameters
    };
    return criteriaQuery;
  }

  private assignBaseQuery(baseQuery: string, hasFilters: boolean): string {
    let query = baseQuery.replace(/\s+/g, ' ').trim();
    if (hasFilters)
      query = `${query} WHERE`;
    return query;
  }

  private assignCriteriaValue(filterOperator: string, filterValue: string): string {
    const value: string = filterOperator === Operator.CONTAINS || filterOperator === Operator.NOT_CONTAINS
      ? `%${filterValue}%`
      : filterValue;
    return value;
  }

  private assignCriteriaCondition(filterOperator: string, filterField: string, parametersLength: number): string {
    let condition: string = '';
    if (filterOperator === Operator.CONTAINS)
      condition = `${filterField} LIKE $${parametersLength}`;
    else if (filterOperator === Operator.NOT_CONTAINS)
      condition = `${filterField} NOT LIKE $${parametersLength}`;
    else if (filterOperator === Operator.NOT_EQUAL)
      condition = `${filterField} <> $${parametersLength}`;
    else
      condition = `${filterField} ${filterOperator} $${parametersLength}`;
    return condition;
  }

  private assignParameters(filters: Filter[]): any[] {
    const parameters: any[] = [];
    filters.forEach(filter => {
      const criteriaValue: string = this.assignCriteriaValue(filter.operator.value, filter.value.value);
      parameters.push(criteriaValue);
    });
    return parameters;
  }

  private assingConditions(filters: Filter[]): string {
    const criteriaConditions: string[] = [];
    filters.forEach(filter => {
      const criteriaCondition: string = this.assignCriteriaCondition(filter.operator.value, filter.field.value, criteriaConditions.length+1);
      criteriaConditions.push(criteriaCondition);
    });
    const conditions: string = criteriaConditions.length > 0 ? criteriaConditions.join(' AND ') : "";
    return conditions;
  }

  private assignOrder(order: Order) {
    let orderBy: string = "";
    if (order.orderBy.value !== '')
      orderBy = `ORDER BY ${order.orderBy.value}`;
    if (!order.orderSequence.isNone())
      orderBy = `${orderBy} ${order.orderSequence.value}`;
    return orderBy;
  }

}

export {
  CriteriaQuery,
  CriteriaBuilder
};