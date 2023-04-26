import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PaginationArgs } from "src/common/args/pagination.args";
import { postsInclude, postsVoteInclude } from "src/posts/posts.type";
import { PrismaService } from "src/prisma/prisma.service";
import { Bookmark } from "./models/bookmark.model";

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  async addOrRemoveBookmark(userId: string, postId: string): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (bookmark) {
      return this.deleteBookmark(userId, bookmark.id);
    } else {
      return this.createBookmark(userId, postId);
    }
  }

  async createBookmark(userId: string, postId: string): Promise<Bookmark> {
    const res = await this.prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
            ...postsVoteInclude(userId),
          },
        },
      },
    });

    return {
      id: res.id,
      post: {
        ...res.post,
        vote: this.getVote(res.post.likes, res.post.dislikes),
      },
    };
  }

  async deleteBookmark(userId: string, bookmarkId: string): Promise<Bookmark> {
    const res = await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
            ...postsVoteInclude(userId),
          },
        },
      },
    });

    return {
      id: res.id,
      post: {
        ...res.post,
        vote: this.getVote(res.post.likes, res.post.dislikes),
      },
    };
  }

  async getBookmarkById(userId: string, id: string): Promise<Bookmark> {
    const res = await this.prisma.bookmark.findUnique({
      where: {
        id,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
            ...postsVoteInclude(userId),
          },
        },
      },
    });

    return {
      id: res.id,
      post: {
        ...res.post,
        vote: this.getVote(res.post.likes, res.post.dislikes),
      },
    };
  }

  async getUsersBookmarks(
    userId: string,
    pagination: PaginationArgs
  ): Promise<Bookmark[]> {
    const res = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          include: {
            ...postsInclude,
            ...postsVoteInclude(userId),
          },
        },
      },
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.map((bookmark) => ({
      id: bookmark.id,
      post: {
        ...bookmark.post,
        vote: this.getVote(bookmark.post.likes, bookmark.post.dislikes),
      },
    }));
  }

  private getVote(likes: User[], dislikes: User[]) {
    if (likes.length > 0) {
      return "like";
    } else if (dislikes.length > 0) {
      return "dislike";
    } else {
      return "none";
    }
  }
}
