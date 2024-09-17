import { Operator } from "./Operator";

export class FilterOperator {
  constructor(readonly value: Operator) {
  }

  static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  // public isPositive(): boolean {
  //   return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
  // }

  // static equal() {
  //   return this.fromValue(Operator.EQUAL);
  // }
}
