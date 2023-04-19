import { Resolver, Query, Args } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { Results } from "./models/results.model";
import { UseGuards } from "@nestjs/common";
import { SearchService } from "./search.service";
import { Post } from "src/posts/models/post.model";
import { PaginationArgs } from "src/common/args/pagination.args";
import { User } from "src/users/models/user.model";
import { CurrentUser as CurrentUserDecorator } from "src/common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";

@Resolver(() => Results)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  async searchPosts(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("term") term: string,
    @Args() pagination: PaginationArgs
  ): Promise<Post[]> {
    return await this.searchService.searchPosts(
      currentUser.user.id,
      term,
      pagination
    );
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async searchUsers(
    @Args("term") term: string,
    @Args() pagination: PaginationArgs
  ): Promise<User[]> {
    return await this.searchService.searchUsers(term, pagination);
  }
}
