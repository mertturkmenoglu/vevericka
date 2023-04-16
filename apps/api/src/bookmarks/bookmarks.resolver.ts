import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Bookmark } from "./models/bookmark.model";
import { BookmarksService } from "./bookmarks.service";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { PaginationArgs } from "src/common/args/pagination.args";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";
import { NewBookmarkInput } from "./dto/new-bookmark.input";
import { JwtAuthGuard } from "src/auth/guards";

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Query(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async bookmark(@Args("id") id: string) {
    const bookmark = await this.bookmarksService.getBookmarkById(id);
    if (!bookmark) {
      throw new NotFoundException(id);
    }
    return bookmark;
  }

  @Query(() => [Bookmark])
  @UseGuards(JwtAuthGuard)
  async bookmarks(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args() pagination: PaginationArgs
  ) {
    return this.bookmarksService.getUsersBookmarks(
      currentUser.user.id,
      pagination
    );
  }

  @Mutation(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async createBookmark(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("newBookmarkData") newBookmarkData: NewBookmarkInput
  ) {
    return this.bookmarksService.createBookmark(
      currentUser.user.id,
      newBookmarkData.postId
    );
  }
}
