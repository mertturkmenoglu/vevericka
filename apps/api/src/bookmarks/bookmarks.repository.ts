import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { bookmarks, TBookmark } from '@/db/tables';
import { and, desc, eq } from 'drizzle-orm';
import { PaginationArgs } from '@/common';

@Injectable()
export class BookmarksRepository {
  constructor(private readonly db: DbService) {}

  async addOrRemoveBookmark(
    userId: string,
    postId: string,
  ): Promise<TBookmark | null> {
    const b = await this.getBookmarkByUserIdAndPostId(userId, postId);

    if (b) {
      return this.deleteBookmark(userId, b.id);
    } else {
      return this.createBookmark(userId, postId);
    }
  }

  async createBookmark(
    userId: string,
    postId: string,
  ): Promise<TBookmark | null> {
    const insertResults = await this.db.client
      .insert(bookmarks)
      .values({
        userId,
        postId,
      })
      .returning();

    return insertResults[0];
  }

  async deleteBookmark(
    userId: string,
    bookmarkId: string,
  ): Promise<TBookmark | null> {
    const deleteResults = await this.db.client
      .delete(bookmarks)
      .where(and(eq(bookmarks.id, bookmarkId), eq(bookmarks.userId, userId)))
      .returning();

    return deleteResults[0];
  }

  async getBookmarkById(bookmarkId: string): Promise<TBookmark | null> {
    const results = await this.db.client
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.id, bookmarkId))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async getBookmarkByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<TBookmark | null> {
    const results = await this.db.client
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.postId, postId)))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async getBookmarksByUserId(
    userId: string,
    pagination: PaginationArgs,
  ): Promise<TBookmark[]> {
    return this.db.client
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt))
      .limit(pagination.take)
      .offset(pagination.skip);
  }

  async deleteAllBookmarksByUserId(userId: string): Promise<boolean> {
    await this.db.client.delete(bookmarks).where(eq(bookmarks.userId, userId));
    return true;
  }
}
