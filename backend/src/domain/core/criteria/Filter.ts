import { FilterField } from "./FilterField";
import { FilterOperator } from "./FilterOperator";
import { FilterValue } from "./FilterValue";

export class Filter {
  constructor(readonly field: FilterField, readonly operator: FilterOperator, readonly value: FilterValue) {
  }

  static fromValues(values: Map<string, string>): Filter {
    const field = values.get('field');
    const operator = values.get('operator');
    const value = values.get('value');

    if (!field || !operator || !value) {
      throw new Error(`The filter is invalid`);
    }

    return new Filter(new FilterField(field), FilterOperator.fromValue(operator), new FilterValue(value));
  }
}
