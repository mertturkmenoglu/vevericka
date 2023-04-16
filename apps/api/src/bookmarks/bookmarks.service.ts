import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Bookmark } from "./models/bookmark.model";
import { postsInclude } from "src/posts/posts.type";
import { PaginationArgs } from "src/common/args/pagination.args";

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBookmark(userId: string, postId: string): Promise<Bookmark> {
    return this.prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
          },
        },
      },
    });
  }

  async getBookmarkById(id: string): Promise<Bookmark> {
    return this.prisma.bookmark.findUnique({
      where: {
        id,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
          },
        },
      },
    });
  }

  async getUsersBookmarks(
    userId: string,
    pagination: PaginationArgs
  ): Promise<Bookmark[]> {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
          },
        },
      },
      skip: pagination.skip,
      take: pagination.take,
    });
  }
}
