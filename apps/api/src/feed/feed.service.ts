import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common/args/pagination.args';
import { DbService } from '@/db/db.service';
import { follows, posts, TPost } from '@/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';

@Injectable()
export class FeedService {
  constructor(private readonly db: DbService) {}

  async getUserFeed(id: string, pagination: PaginationArgs): Promise<TPost[]> {
    const followingIds = await this.getFollowingUsersIds(id);

    return await this.db.client
      .select()
      .from(posts)
      .where(inArray(posts.userId, followingIds))
      .orderBy(desc(posts.createdAt))
      .limit(pagination.take)
      .offset(pagination.skip);
  }

  private async getFollowingUsersIds(id: string): Promise<string[]> {
    const res = await this.db.client
      .select({ followingId: follows.followingId })
      .from(follows)
      .where(eq(follows.followerId, id));

    return res.map((it) => it.followingId);
  }
}
