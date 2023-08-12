import { InjectQueue } from '@nestjs/bull';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Novu } from '@novu/node';
import { Queue } from 'bull';
import { JwtAuthGuard } from '@/auth';
import { PaginationArgs, CurrentUser, TCurrentUser } from '@/common';
import { AxiomService } from '@/axiom/axiom.service';
import { SearchService } from '@/search/search.service';
import { NewPostInput, BulkCreatePostsInput, Vote } from '@/posts/dto';
import { Post } from '@/posts/models';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  private readonly novu = new Novu(process.env['NOVU_API_KEY'] ?? '');

  constructor(
    @InjectQueue('posts') private readonly postsQueue: Queue,
    private readonly postsService: PostsService,
    private readonly searchService: SearchService,
    private readonly axiomService: AxiomService,
  ) {}

  @Query(() => Post)
  @UseGuards(JwtAuthGuard)
  async post(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('id') id: string,
  ): Promise<Post> {
    const post = await this.postsService.findOneById(currentUser.user.id, id);
    if (!post) {
      throw new NotFoundException(id);
    }
    return post;
  }

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  async posts(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('id') id: string,
    @Args() pagination: PaginationArgs,
  ): Promise<Post[]> {
    return await this.postsService.getPostsByUserId(
      currentUser.user.id,
      id,
      pagination,
    );
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('newPostData') newPostData: NewPostInput,
  ): Promise<Post> {
    const result = await this.postsService.create(
      currentUser.user.id,
      newPostData,
    );

    await this.searchService.addPostToSearchIndex({
      id: result.id,
      userId: result.user.id,
      content: result.content,
    });

    return result;
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async votePost(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('id') id: string,
    @Args('vote') vote: string,
  ): Promise<boolean> {
    const userId = currentUser.user.id;
    const result = await this.postsService.changeVote(userId, id, vote as Vote);

    const post = await this.postsService.findOneById(userId, id);

    if (!post) {
      return false;
    }

    if (vote === 'like') {
      await this.novu.trigger('post-like', {
        to: {
          subscriberId: post.user.id,
        },
        payload: {
          postId: post.id,
          name: currentUser.user.name,
        },
      });
    }

    return result;
  }

  @Mutation(() => Post, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async deletePost(@Args('id') id: string): Promise<boolean> {
    const result = await this.postsService.remove(id);

    if (!result) {
      throw new NotFoundException(id);
    }

    await this.searchService.removePostFromSearchIndex(id);

    return result;
  }

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  async postsByTag(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('tag') tag: string,
    @Args() pagination: PaginationArgs,
  ): Promise<Post[]> {
    return await this.postsService.getPostsByTag(
      currentUser.user.id,
      tag,
      pagination,
    );
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async bulkCreatePosts(
    @CurrentUser() currentUser: TCurrentUser,
    @Args('payload') payload: BulkCreatePostsInput,
  ): Promise<string> {
    await this.postsQueue.add('createPost', {
      userId: currentUser.user.id,
      dtos: payload.posts,
    });

    const message = `Queued ${
      payload.posts.length
    } items at ${new Date().toISOString()}`;

    await this.axiomService.sendEvents({
      message,
      type: 'bulkCreatePosts',
      userId: currentUser.user.id,
    });

    return message;
  }
}
