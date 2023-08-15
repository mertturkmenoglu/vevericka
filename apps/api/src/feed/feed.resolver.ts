import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@/auth';
import { PaginationArgs, CurrentUser, TCurrentUser } from '@/common';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';
import { TPost } from '@/db/tables';

@Resolver(() => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query(() => Feed)
  @UseGuards(JwtAuthGuard)
  async feed(
    @CurrentUser() currentUser: TCurrentUser,
    @Args() pagination: PaginationArgs,
  ): Promise<TPost[]> {
    const feed = await this.feedService.getUserFeed(
      currentUser.user.id,
      pagination,
    );
    if (!feed) {
      throw new NotFoundException(currentUser.user.id);
    }
    return feed;
  }
}
