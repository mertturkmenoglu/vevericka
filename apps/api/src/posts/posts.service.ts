import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";

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
        images: true,
        tags: true,
        videos: true,
        user: true,
        _count: {
          select: {
            comments: true,
            dislikes: true,
            likes: true,
            tags: true,
          },
        },
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
        user: true,
        images: true,
        tags: true,
        videos: true,
        _count: {
          select: {
            comments: true,
            dislikes: true,
            likes: true,
            tags: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Post[]> {
    const res = await this.prisma.post.findMany({
      include: {
        user: true,
        images: true,
        tags: true,
        videos: true,
        _count: {
          select: {
            comments: true,
            dislikes: true,
            likes: true,
            tags: true,
          },
        },
      },
    });
    return res;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }

  private prepareTags(content: string): string[] {
    const hashtagRegex = /#[-A-Z0-9_]+/gi;
    const tags = content.match(hashtagRegex);
    return tags || [];
  }
}
