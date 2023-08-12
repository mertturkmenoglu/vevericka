import { InjectQueue } from '@nestjs/bull';
import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Queue } from 'bull';
import { JwtAuthGuard } from '@/auth/guards';
import { ElasticResult, PostResult, UserResult } from '@/search/models';
import { SearchService } from './search.service';

@Resolver(() => ElasticResult)
export class SearchResolver {
  constructor(
    @InjectQueue('searchIndices') private readonly searchIndicesQueue: Queue,
    private readonly searchService: SearchService,
  ) {}

  @Query(() => PostResult)
  @UseGuards(JwtAuthGuard)
  async searchPosts(): Promise<PostResult> {
    return await this.searchService.searchPosts();
  }

  @Query(() => UserResult)
  @UseGuards(JwtAuthGuard)
  async searchUsers(): Promise<UserResult> {
    return await this.searchService.searchUsers();
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateSearchIndices(): Promise<string> {
    await this.searchIndicesQueue.add('updateSearchIndices', {});
    return `Started updating search indices at ${new Date().toISOString()}`;
  }
}
