export interface Pagination {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: Pagination;
}
