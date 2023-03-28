import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";
import { postsInclude } from "./posts.type";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

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

    return post;
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

    return post;
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

    return post;
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

    return post;
  }

  async findOneById(id: string): Promise<Post> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        ...postsInclude,
      },
    });
  }

  async remove(id: string): Promise<Post | null> {
    const post = await this.prisma.post.delete({
      where: {
        id,
      },
      include: {
        ...postsInclude,
      },
    });

    return post;
  }

  private prepareTags(content: string): string[] {
    const hashtagRegex = /#[-A-Z0-9_]+/gi;
    const tags = content.match(hashtagRegex);
    return tags || [];
  }
}
