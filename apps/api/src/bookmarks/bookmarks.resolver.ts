import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@/auth/guards';
import { PaginationArgs, TCurrentUser, CurrentUser } from '@/common';
import { BookmarksService } from './bookmarks.service';
import { NewBookmarkInput } from './dto/new-bookmark.input';
import { Bookmark } from './models/bookmark.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Query(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async bookmark(
    @CurrentUser() currentUser: TCurrentUser,
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
    @CurrentUser() currentUser: TCurrentUser,
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
    @CurrentUser() currentUser: TCurrentUser,
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
    @CurrentUser() currentUser: TCurrentUser,
    @Args('postId') postId: string,
  ) {
    return this.bookmarksService.addOrRemoveBookmark(
      currentUser.user.id,
      postId,
    );
  }
}
