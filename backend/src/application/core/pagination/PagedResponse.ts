type PagedResponse<T> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  records: T[];
};