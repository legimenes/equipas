export default class Pagination<T> {
  static get<T>(currentPage: number, pageSize: number, records: T[]): PagedResponse<T> {
    if (records.length === 0) {
      return {
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        totalRecords: 0,
        records: []
      }
    }
    const totalRecords: number = records.length;
    const totalPages: number = Math.ceil(totalRecords / pageSize);
    const pagedResponse: PagedResponse<T> = {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      totalRecords: totalRecords,
      records: records
    }
    return pagedResponse;
  }
}