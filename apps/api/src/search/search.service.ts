import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginationArgs } from "src/common/args/pagination.args";
import { postsInclude } from "src/posts/posts.type";
import { Post } from "src/posts/models/post.model";
import { User } from "src/users/models/user.model";

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchPosts(term: string, pagination: PaginationArgs): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        content: {
          contains: term,
        },
      },
      skip: pagination.skip,
      take: pagination.take,
      include: {
        ...postsInclude,
      },
    });
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
}
