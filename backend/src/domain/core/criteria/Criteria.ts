import Filters from "./Filters";
import { Order } from "./Order";

export class Criteria {

  constructor(readonly filters: Filters, readonly order: Order, readonly limit?: number, readonly offset?: number) {
    if ((offset === undefined || Number(offset) == 0) && (limit !== undefined && Number(limit) > 0))
      throw new Error("Invalid pagination parameters");
    if ((limit === undefined || Number(limit) == 0) && (offset !== undefined && Number(offset) > 0))
      throw new Error("Invalid pagination parameters");
  }

  hasFilters(): boolean {
    return (this.filters.filters.length > 0);
  }

  hasPagination(): boolean {
    return (this.offset !== undefined && this.limit !== undefined && Number(this.offset) > 0 && Number(this.limit) > 0);
  }
}