import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { CurrentUser as CurrentUserDecorator } from "src/common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";
import { PaginationArgs } from "../common/args/pagination.args";
import { FeedService } from "./feed.service";
import { Feed } from "./models/feed.model";

@Resolver(() => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query(() => Feed)
  @UseGuards(JwtAuthGuard)
  async feed(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args() pagination: PaginationArgs
  ): Promise<Feed> {
    const feed = await this.feedService.getUserFeed(
      currentUser.user.id,
      pagination
    );
    if (!feed) {
      throw new NotFoundException(currentUser.user.id);
    }
    return feed;
  }
}
