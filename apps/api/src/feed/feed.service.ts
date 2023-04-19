import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/args/pagination.args";
import { PrismaService } from "../prisma/prisma.service";
import { Feed } from "./models/feed.model";
import { postsInclude, postsVoteInclude } from "src/posts/posts.type";
import { User } from "@prisma/client";

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  private async getFriendsIds(id: string): Promise<string[]> {
    const res = await this.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        following: {
          select: {
            id: true,
          },
        },
      },
    });
    return res.following.map((it) => it.id);
  }

  async getUserFeed(id: string, pagination: PaginationArgs): Promise<Feed> {
    const followingIds = await this.getFriendsIds(id);
    const res = await this.prisma.post.findMany({
      where: {
        userId: {
          in: [...followingIds, id],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        ...postsInclude,
        ...postsVoteInclude(id),
      },
      skip: pagination.skip,
      take: pagination.take,
    });
    return {
      posts: res.map((post) => ({
        ...post,
        vote: this.getVote(post.likes, post.dislikes),
      })),
    };
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
