import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PostItem, PostResult, UserItem, UserResult } from '@/search/models';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async addPostToSearchIndex(postItem: PostItem) {
    return this.elasticsearchService.index({
      index: 'posts',
      document: postItem,
    });
  }

  async addUserToSearchIndex(userItem: UserItem) {
    return this.elasticsearchService.index({
      index: 'users',
      document: userItem,
    });
  }

  async removePostFromSearchIndex(postId: string) {
    return this.elasticsearchService.deleteByQuery({
      index: 'posts',
      query: {
        match: {
          id: postId,
        },
      },
    });
  }

  async searchPosts(): Promise<PostResult> {
    return {
      hits: {
        hits: [],
      },
      _shards: {
        failed: 0,
        skipped: 0,
        successful: 0,
        total: 0,
      },
      timed_out: false,
      took: 0,
    };
  }

  async searchUsers(): Promise<UserResult> {
    return {
      hits: {
        hits: [],
      },
      _shards: {
        failed: 0,
        skipped: 0,
        successful: 0,
        total: 0,
      },
      timed_out: false,
      took: 0,
    };
  }
}
