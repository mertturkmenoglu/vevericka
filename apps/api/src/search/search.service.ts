import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PaginationArgs } from "../common/args/pagination.args";
import { postsInclude, postsVoteInclude } from "../posts/posts.type";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "../users/models/user.model";
import { PostItem } from "./models/post/post-item.model";
import { PostResult } from "./models/post/post-result.model";
import { UserItem } from "./models/user/user-item.model";
import { UserResult } from "./models/user/user-result.model";

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly prisma: PrismaService
  ) {}

  async addPostToSearchIndex(postItem: PostItem) {
    return this.elasticsearchService.index({
      index: "posts",
      document: postItem,
    });
  }

  async addUserToSearchIndex(userItem: UserItem) {
    return this.elasticsearchService.index({
      index: "users",
      document: userItem,
    });
  }

  async removePostFromSearchIndex(postId: string) {
    return this.elasticsearchService.deleteByQuery({
      index: "posts",
      query: {
        match: {
          id: postId,
        },
      },
    });
  }

  async searchPosts(
    userId: string,
    term: string,
    pagination: PaginationArgs
  ): Promise<PostResult> {
    const searchResults = await this.elasticsearchService.search<PostItem>({
      index: "posts",
      query: {
        match: {
          content: {
            query: term,
          },
        },
      },
      from: pagination.skip,
      size: pagination.take,
    });

    const postIds = searchResults.hits.hits.map((hit) => hit._source.id);

    const posts = (
      await this.prisma.post.findMany({
        where: {
          id: {
            in: postIds,
          },
        },
        include: {
          ...postsInclude,
          ...postsVoteInclude(userId),
        },
      })
    ).map((post) => ({
      ...post,
      vote: this.getVote(post.likes, post.dislikes),
    }));

    return {
      ...searchResults,
      hits: {
        ...searchResults.hits,
        hits: searchResults.hits.hits.map((hit) => ({
          ...hit,
          _source: posts.find((post) => post.id === hit._source.id),
        })),
      },
    };
  }

  async searchUsers(
    term: string,
    pagination: PaginationArgs
  ): Promise<UserResult> {
    const searchResults = await this.elasticsearchService.search<UserItem>({
      index: "users",
      query: {
        match: {
          name: {
            query: term,
          },
        },
      },
      from: pagination.skip,
      size: pagination.take,
    });

    const userIds = searchResults.hits.hits.map((hit) => hit._source.id);

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    return {
      ...searchResults,
      hits: {
        ...searchResults.hits,
        hits: searchResults.hits.hits.map((hit) => ({
          ...hit,
          _source: users.find((post) => post.id === hit._source.id),
        })),
      },
    };
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
