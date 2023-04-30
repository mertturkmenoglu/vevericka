import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "../common/args/pagination.args";
import { PrismaService } from "../prisma/prisma.service";
import { Vote } from "./dto/vote-post.input";
import { postsInclude, postsVoteInclude, TPostResult } from "./posts.type";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async changeVote(userId: string, postId: string, vote: Vote): Promise<void> {
    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          [vote === "like" ? "connect" : "disconnect"]: {
            id: userId,
          },
        },
        dislikes: {
          [vote === "dislike" ? "connect" : "disconnect"]: {
            id: userId,
          },
        },
      },
    });
  }

  async findOneById(userId: string, id: string): Promise<TPostResult> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        ...postsInclude,
        ...postsVoteInclude(userId),
      },
    });
  }

  async deleteOneById(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }

  async findManyByThisUserIdAndUserId(
    thisUserId: string,
    userId: string,
    { skip, take }: PaginationArgs
  ): Promise<TPostResult[]> {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        ...postsInclude,
        ...postsVoteInclude(thisUserId),
      },
      skip,
      take,
    });
  }
}
