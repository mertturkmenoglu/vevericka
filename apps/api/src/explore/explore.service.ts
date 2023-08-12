import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common/args/pagination.args';
import { DbService } from '@/db/db.service';
import { tags } from '@/db/schema';

@Injectable()
export class ExploreService {
  constructor(private readonly db: DbService) {}

  async getTags(pagination: PaginationArgs) {
    return await this.db.client
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
