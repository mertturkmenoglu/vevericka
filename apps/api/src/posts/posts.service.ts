import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";
import { postsInclude, postsVoteInclude } from "./posts.type";
import { OramaService } from "src/orama/orama.service";
import { PaginationArgs } from "src/common/args/pagination.args";
import { User } from "@prisma/client";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService, private orama: OramaService) {}

  async create(userId: string, data: NewPostInput): Promise<Post> {
    const tags = this.prepareTags(data.content);

    await this.prisma.tag.createMany({
      data: tags.map((tag) => ({ tagName: tag })),
      skipDuplicates: true,
    });

    const post = await this.prisma.post.create({
      data: {
        content: data.content,
        tags: {
          connect: tags.map((tag) => ({ tagName: tag })),
        },
        images: {
          createMany: {
            data: data.imageUrls.map((url) => ({
              url,
            })),
          },
        },
        videos: {
          createMany: {
            data: data.videoUrls.map((url) => ({
              url,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        ...postsInclude,
      },
    });

    await this.orama.onPostCreated(post);

    return {
      ...post,
      vote: "none",
    };
  }

  async likePost(userId: string, postId: string): Promise<Post> {
    const post = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          connect: {
            id: userId,
          },
        },
        dislikes: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        ...postsInclude,
      },
    });

    return {
      ...post,
      vote: "like",
    };
  }

  async dislikePost(userId: string, postId: string): Promise<Post> {
    const post = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          disconnect: {
            id: userId,
          },
        },
        dislikes: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        ...postsInclude,
      },
    });

    return {
      ...post,
      vote: "dislike",
    };
  }

  async removeVote(userId: string, postId: string): Promise<Post> {
    const post = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          disconnect: {
            id: userId,
          },
        },
        dislikes: {
          disconnect: {
            id: userId,
          },
        },
      },
      include: {
        ...postsInclude,
      },
    });

    return {
      ...post,
      vote: "none",
    };
  }

  async findOneById(userId: string, id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        ...postsInclude,
        ...postsVoteInclude(userId),
      },
    });

    return {
      ...post,
      vote: this.getVote(post.likes, post.dislikes),
    };
  }

  async remove(userId: string, id: string): Promise<Post | null> {
    const post = await this.prisma.post.delete({
      where: {
        id,
      },
      include: {
        ...postsInclude,
        ...postsVoteInclude(userId),
      },
    });

    return {
      ...post,
      vote: this.getVote(post.likes, post.dislikes),
    };
  }

  async getPostsByUserId(
    thisUserId: string,
    userId: string,
    pagination: PaginationArgs
  ): Promise<Post[]> {
    const res = await this.prisma.post.findMany({
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
      skip: pagination.skip,
      take: pagination.take,
    });

    return res.map((post) => ({
      ...post,
      vote: this.getVote(post.likes, post.dislikes),
    }));
  }

  private prepareTags(content: string): string[] {
    const hashtagRegex = /#[-A-Z0-9_]+/gi;
    const tags = content.match(hashtagRegex);
    return tags || [];
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
