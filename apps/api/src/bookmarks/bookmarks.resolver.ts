import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@/auth/guards';
import { PaginationArgs } from '@/common/args/pagination.args';
import { CurrentUser } from '@/common/types/current-user.type';
import { CurrentUser as CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { BookmarksService } from './bookmarks.service';
import { NewBookmarkInput } from './dto/new-bookmark.input';
import { Bookmark } from './models/bookmark.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Query(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async bookmark(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args('id') id: string,
  ) {
    const bookmark = await this.bookmarksService.getBookmarkById(
      currentUser.user.id,
      id,
    );
    if (!bookmark) {
      throw new NotFoundException(id);
    }
    return bookmark;
  }

  @Query(() => [Bookmark])
  @UseGuards(JwtAuthGuard)
  async bookmarks(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args() pagination: PaginationArgs,
  ) {
    return this.bookmarksService.getUsersBookmarks(
      currentUser.user.id,
      pagination,
    );
  }

  @Mutation(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async createBookmark(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args('newBookmarkData') newBookmarkData: NewBookmarkInput,
  ) {
    return this.bookmarksService.createBookmark(
      currentUser.user.id,
      newBookmarkData.postId,
    );
  }

  @Mutation(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async addOrRemoveBookmark(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args('postId') postId: string,
  ) {
    return this.bookmarksService.addOrRemoveBookmark(
      currentUser.user.id,
      postId,
    );
  }
}
