import { PaginationOrder } from './PaginationOrder';

export class PaginationQuery {
  constructor(
    private readonly _order = PaginationOrder.DESC,
    private readonly _page = 1,
    private readonly _pageSize = 10,
  ) {}

  get page(): number {
    return this._page || 1;
  }

  get pageSize(): number {
    return this._pageSize || 10;
  }

  get order(): PaginationOrder {
    return this._order || PaginationOrder.DESC;
  }

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
