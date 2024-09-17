import { OrderDirection } from "./OrderDirection";

export class OrderSequence {
  constructor(readonly value: OrderDirection) {
  }

  static fromValue(value: string): OrderSequence {
    for (const orderDirectionValue of Object.values(OrderDirection)) {
      if (value === orderDirectionValue.toString()) {
        return new OrderSequence(orderDirectionValue);
      }
    }

    throw new Error(`The order type ${value} is invalid`);
  }

  public isNone(): boolean {
    return this.value === OrderDirection.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderDirection.ASC;
  }
}
