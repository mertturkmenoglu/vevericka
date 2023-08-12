import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common';
import { DbService } from '@/db/db.service';
import { bookmarks, TBookmark } from '@/db';
import { and, desc, eq } from 'drizzle-orm';

@Injectable()
export class BookmarksService {
  constructor(private readonly db: DbService) {}

  async addOrRemoveBookmark(
    userId: string,
    postId: string,
  ): Promise<TBookmark> {
    const results = await this.db.client
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.postId, postId)))
      .limit(1);

    if (results.length === 0) {
      return this.createBookmark(userId, postId);
    } else {
      return this.deleteBookmark(userId, results[0].id);
    }
  }

  async createBookmark(userId: string, postId: string): Promise<TBookmark> {
    const insertResults = await this.db.client
      .insert(bookmarks)
      .values({
        userId,
        postId,
      })
      .returning();

    return insertResults[0];
  }

  async deleteBookmark(userId: string, bookmarkId: string): Promise<TBookmark> {
    const deleteResults = await this.db.client
      .delete(bookmarks)
      .where(eq(bookmarks.id, bookmarkId))
      .returning();

    return deleteResults[0];
  }

  async getBookmarkById(userId: string, id: string): Promise<TBookmark | null> {
    const results = await this.db.client
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.id, id)))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async getUsersBookmarks(
    userId: string,
    pagination: PaginationArgs,
  ): Promise<TBookmark[]> {
    return await this.db.client
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt))
      .limit(pagination.take)
      .offset(pagination.skip);
  }
}
