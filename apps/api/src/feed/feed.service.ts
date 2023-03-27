import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/common/args/pagination.args";
import { PrismaService } from "../prisma/prisma.service";
import { Feed } from "./models/feed.model";

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
      include: {
        comments: true,
        user: true,
      },
      skip: pagination.skip,
      take: pagination.take,
    });
    return {
      posts: res,
    };
  }
}
