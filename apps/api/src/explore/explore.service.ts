import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common';
import { DbService } from '@/db/db.service';
import { tags } from '@/db/tables';

@Injectable()
export class ExploreService {
  constructor(private readonly db: DbService) {}

  async getTags(pagination: PaginationArgs) {
    return this.db.client
      .select()
      .from(tags)
      .limit(pagination.take)
      .offset(pagination.skip);
  }

  async getPopularTags(pagination: PaginationArgs) {
    const result = await this.db.client
      .select()
      .from(tags)
      .limit(pagination.take)
      .offset(pagination.skip);

    return result.map((t) => ({
      ...t,
      count: 0,
    }));
  }
}
