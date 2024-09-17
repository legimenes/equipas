import { Filter } from "./Filter";

export default class Filters {
  constructor(readonly filters: Filter[]) {
  }

  static fromValues(filters: Array<Map<string, string>>): Filters {
    return new Filters(filters.map(Filter.fromValues));
  }

  static none(): Filters {
    return new Filters([]);
  }
}
