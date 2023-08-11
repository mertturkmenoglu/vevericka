import { InjectQueue } from "@nestjs/bull";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Queue } from "bull";
import { JwtAuthGuard } from "../auth/guards";
import { PaginationArgs } from "../common/args/pagination.args";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "../common/types/current-user.type";
import { ElasticResult } from "./models/common/elastic-result.model";
import { PostResult } from "./models/post/post-result.model";
import { UserResult } from "./models/user/user-result.model";
import { SearchService } from "./search.service";

@Resolver(() => ElasticResult)
export class SearchResolver {
  constructor(
    @InjectQueue("searchIndices") private readonly searchIndicesQueue: Queue,
    private readonly searchService: SearchService
  ) {}

  @Query(() => PostResult)
  @UseGuards(JwtAuthGuard)
  async searchPosts(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("term") term: string,
    @Args() pagination: PaginationArgs
  ): Promise<PostResult> {
    return await this.searchService.searchPosts(
      currentUser.user.id,
      term,
      pagination
    );
  }

  @Query(() => UserResult)
  @UseGuards(JwtAuthGuard)
  async searchUsers(
    @Args("term") term: string,
    @Args() pagination: PaginationArgs
  ): Promise<UserResult> {
    return await this.searchService.searchUsers(term, pagination);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateSearchIndices(): Promise<string> {
    await this.searchIndicesQueue.add("updateSearchIndices", {});
    return `Started updating search indices at ${new Date().toISOString()}`;
  }
}
