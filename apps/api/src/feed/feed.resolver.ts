import { NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { PaginationArgs } from "../common/args/pagination.args";
import { FeedService } from "./feed.service";
import { Feed } from "./models/feed.model";

@Resolver(() => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query(() => Feed)
  async feed(
    @Args("id") id: number,
    @Args() pagination: PaginationArgs
  ): Promise<Feed> {
    const feed = await this.feedService.getUserFeed(id, pagination);
    if (!feed) {
      throw new NotFoundException(id);
    }
    return feed;
  }
}
