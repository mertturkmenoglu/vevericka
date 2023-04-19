import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginationArgs } from "src/common/args/pagination.args";
import { postsInclude, postsVoteInclude } from "src/posts/posts.type";
import { Post } from "src/posts/models/post.model";
import { User } from "src/users/models/user.model";

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchPosts(
    userId: string,
    term: string,
    pagination: PaginationArgs
  ): Promise<Post[]> {
    const res = await this.prisma.post.findMany({
      where: {
        content: {
          contains: term,
        },
      },
      skip: pagination.skip,
      take: pagination.take,
      include: {
        ...postsInclude,
        ...postsVoteInclude(userId),
      },
    });

    return res.map((post) => ({
      ...post,
      vote: this.getVote(post.likes, post.dislikes),
    }));
  }

  async searchUsers(term: string, pagination: PaginationArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: term,
        },
      },
      skip: pagination.skip,
      take: pagination.take,
    });
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
