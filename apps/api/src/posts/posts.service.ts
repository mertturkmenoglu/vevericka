import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: NewPostInput): Promise<Post> {
    return {} as any;
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
