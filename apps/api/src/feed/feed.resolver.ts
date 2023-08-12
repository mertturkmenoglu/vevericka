import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@/auth/guards';
import { PaginationArgs } from '@/common/args/pagination.args';
import { CurrentUser as CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { CurrentUser } from '@/common/types/current-user.type';
import { FeedService } from './feed.service';
import { Feed } from './models/feed.model';
import { TPost } from '@/db/schema';

@Resolver(() => Feed)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query(() => Feed)
  @UseGuards(JwtAuthGuard)
  async feed(
    @CurrentUserDecorator() currentUser: CurrentUser,
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
