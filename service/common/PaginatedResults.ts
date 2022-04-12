import { PaginationOrder } from './PaginationOrder';

export interface Pagination {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  totalPages: number;
  order: PaginationOrder;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export type PaginatedResults<T> = {
  data: T;
  pagination: Pagination;
};
