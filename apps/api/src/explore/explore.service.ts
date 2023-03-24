import { Injectable } from "@nestjs/common";
import { Tag } from "@prisma/client";
import { PaginationArgs } from "../common/args/pagination.args";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ExploreService {
  constructor(private readonly prisma: PrismaService) {}

  async getTags(pagination: PaginationArgs) {
    const result = await this.prisma.tag.findMany({
      include: {
        _count: true,
        posts: {
          take: 10,
          include: {
            user: true,
            comments: true,
          },
        },
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      skip: pagination.skip,
      take: pagination.take,
    });

    return result;
  }
}
