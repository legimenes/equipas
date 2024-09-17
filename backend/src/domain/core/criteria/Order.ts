import { OrderBy } from "./OrderBy";
import { OrderDirection } from "./OrderDirection";
import { OrderSequence } from "./OrderSequence";

export class Order {
  constructor(readonly orderBy: OrderBy, readonly orderSequence: OrderSequence) {
  }

  static fromValues(orderBy?: string, orderSequence?: string): Order {
    if (!orderBy) {
      return Order.none();
    }

    return new Order(new OrderBy(orderBy), OrderSequence.fromValue(orderSequence || OrderDirection.ASC));
  }

  static none(): Order {
    return new Order(new OrderBy(''), new OrderSequence(OrderDirection.NONE));
  }

  static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderSequence(OrderDirection.DESC));
  }

  static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderSequence(OrderDirection.ASC));
  }

  public hasOrder() {
    return !this.orderSequence.isNone();
  }
}
