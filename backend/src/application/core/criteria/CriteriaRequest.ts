import { Criteria } from "@domain/core/criteria/Criteria";
import Filters from "@domain/core/criteria/Filters";
import { Order } from "@domain/core/criteria/Order";

type FilterType = {
  value: string,
  operator: string,
  field: string
}

class CriteriaRequest {
  constructor(
    readonly filters: FilterType[],
    readonly orderBy?: string,
    readonly orderSequence?: string,
    readonly limit?: string,
    readonly offset?: string) {
      if ((offset === undefined || Number(offset) == 0) && (limit !== undefined && Number(limit) > 0))
        throw new Error("Invalid pagination parameters");
      if ((limit === undefined || Number(limit) == 0) && (offset !== undefined && Number(offset) > 0))
        throw new Error("Invalid pagination parameters");
  }

  public convertToCriteria(): Criteria {
    const filters: Filters = Filters.fromValues(this.parseFilters(this.filters));
    const order : Order = Order.fromValues(this.orderBy, this.orderSequence);
    const limit: number | undefined = this.limit !== undefined ? Number(this.limit) : undefined;
    const offset: number | undefined = this.offset !== undefined ? Number(this.offset) : undefined;

    const criteria: Criteria = new Criteria(
      filters,
      order,
      limit,
      offset);

    return criteria;
  }

  private parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
    if (!params) {
      return new Array<Map<string, string>>();
    }

    return params.map(filter => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ]);
    });
  }
}

export {
  CriteriaRequest,
  FilterType
};
