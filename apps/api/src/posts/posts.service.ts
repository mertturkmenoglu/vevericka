import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: NewPostInput): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        content: data.content,
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
      },
    });
  }

  async findAll(): Promise<Post[]> {
    const res = await this.prisma.post.findMany({
      include: { user: true, images: true, tags: true, videos: true },
    });
    return res;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
