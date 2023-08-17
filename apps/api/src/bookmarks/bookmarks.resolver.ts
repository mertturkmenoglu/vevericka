import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '@/auth/guards';
import { PaginationArgs, TCurrentUser, CurrentUser } from '@/common';
import { BookmarksService } from './bookmarks.service';
import { NewBookmarkInput } from './dto/new-bookmark.input';
import { Bookmark } from './models/bookmark.model';
import { PostsService } from '@/posts/posts.service';
import { Post } from '@/posts/models';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(
    private readonly bookmarksService: BookmarksService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async bookmark(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('id') id: string,
  ) {
    const bookmark = await this.bookmarksService.getBookmarkById(
      currentUser.id,
      id,
    );
    if (!bookmark) {
      throw new NotFoundException(id);
    }
    return bookmark;
  }

  @ResolveField(() => Post, { nullable: true })
  async resolveBookmarkPost(
    @Parent() bookmark: Bookmark,
    @Context() ctx: GqlExecutionContext,
  ) {
    const userId = ctx.getContext().req.user.id;
    return this.postsService.findOneById(userId, bookmark.postId);
  }
  @Query(() => [Bookmark])
  @UseGuards(JwtAuthGuard)
  async bookmarks(
    @CurrentUser() currentUser: TCurrentUser,
    @Args() pagination: PaginationArgs,
  ) {
    return this.bookmarksService.getUsersBookmarks(currentUser.id, pagination);
  }

  @Mutation(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async createBookmark(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('newBookmarkData') newBookmarkData: NewBookmarkInput,
  ) {
    return this.bookmarksService.createBookmark(
      currentUser.id,
      newBookmarkData.postId,
    );
  }

  @Mutation(() => Bookmark)
  @UseGuards(JwtAuthGuard)
  async addOrRemoveBookmark(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('postId') postId: string,
  ) {
    return this.bookmarksService.addOrRemoveBookmark(currentUser.id, postId);
  }
}
