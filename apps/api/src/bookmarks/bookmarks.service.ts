import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common';
import { TBookmark } from '@/db/tables';
import { BookmarksRepository } from '@/bookmarks/bookmarks.repository';

@Injectable()
export class BookmarksService {
  constructor(private readonly repository: BookmarksRepository) {}

  async addOrRemoveBookmark(
    userId: string,
    postId: string,
  ): Promise<TBookmark | null> {
    return await this.repository.addOrRemoveBookmark(userId, postId);
  }

  async createBookmark(
    userId: string,
    postId: string,
  ): Promise<TBookmark | null> {
    return await this.repository.createBookmark(userId, postId);
  }

  async getBookmarkById(userId: string, id: string): Promise<TBookmark | null> {
    const result = await this.repository.getBookmarkById(id);
    if (result && result.userId !== userId) {
      return null;
    }
    return result;
  }

  async getUsersBookmarks(
    userId: string,
    pagination: PaginationArgs,
  ): Promise<TBookmark[]> {
    return await this.repository.getBookmarksByUserId(userId, pagination);
  }

  async deleteAllBookmarks(userId: string): Promise<boolean> {
    return await this.repository.deleteAllBookmarksByUserId(userId);
  }
}
