import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PaginationArgs } from "src/common/args/pagination.args";
import { PrismaService } from "../prisma/prisma.service";
import { NewPostInput } from "./dto/new-post.input";
import { Vote } from "./dto/vote-post.input";
import { Post } from "./models/post.model";
import { PostsRepository } from "./posts.repository";
import { postsInclude, postsVoteInclude, TPostResult } from "./posts.type";

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private readonly repository: PostsRepository
  ) {}

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

    return {
      ...post,
      poll: {
        ...post.poll,
        choices: post.poll.choices.toString(),
      },
      vote: "none",
    };
  }

  async changeVote(
    userId: string,
    postId: string,
    vote: Vote
  ): Promise<boolean> {
    await this.repository.changeVote(userId, postId, vote);
    return true;
  }

  async findOneById(userId: string, id: string): Promise<Post> {
    const post = await this.repository.findOneById(userId, id);
    return this.mapQueryResultToResponse(post);
  }

  async remove(id: string): Promise<boolean> {
    await this.repository.deleteOneById(id);
    return true;
  }

  async getPostsByUserId(
    thisUserId: string,
    userId: string,
    pagination: PaginationArgs
  ): Promise<Post[]> {
    const posts = await this.repository.findManyByThisUserIdAndUserId(
      thisUserId,
      userId,
      pagination
    );

    return posts.map(this.mapQueryResultToResponse.bind(this));
  }

  async getPostsByTag(
    userId: string,
    tag: string,
    pagination: PaginationArgs
  ): Promise<Post[]> {
    const res = await this.prisma.tag.findUnique({
      where: {
        tagName: `#${tag}`,
      },
      include: {
        posts: {
          include: {
            ...postsInclude,
            ...postsVoteInclude(userId),
          },
          skip: pagination.skip,
          take: pagination.take,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.posts.map(this.mapQueryResultToResponse.bind(this));
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

  private mapQueryResultToResponse(post: TPostResult) {
    return {
      ...post,
      poll: {
        ...post.poll,
        choices: post.poll.choices.toString(),
      },
      vote: this.getVote(post.likes, post.dislikes),
    };
  }
}
