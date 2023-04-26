import { InjectQueue } from "@nestjs/bull";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Novu } from "@novu/node";
import { Queue } from "bull";
import { JwtAuthGuard } from "src/auth/guards";
import { PaginationArgs } from "src/common/args/pagination.args";
import { CurrentUser } from "src/common/types/current-user.type";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { BulkCreatePostsInput } from "./dto/bulk-create-posts.input";
import { NewPostInput } from "./dto/new-post.input";
import { Vote } from "./dto/vote-post.input";
import { Post } from "./models/post.model";
import { PostsService } from "./posts.service";

@Resolver(() => Post)
export class PostsResolver {
  private readonly novu = new Novu(process.env.NOVU_API_KEY);

  constructor(
    @InjectQueue("posts") private readonly postsQueue: Queue,
    private readonly postsService: PostsService
  ) {}

  @Query(() => Post)
  @UseGuards(JwtAuthGuard)
  async post(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
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
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string,
    @Args() pagination: PaginationArgs
  ): Promise<Post[]> {
    const posts = await this.postsService.getPostsByUserId(
      currentUser.user.id,
      id,
      pagination
    );
    return posts;
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("newPostData") newPostData: NewPostInput
  ): Promise<Post> {
    const post = await this.postsService.create(
      currentUser.user.id,
      newPostData
    );
    return post;
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async votePost(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string,
    @Args("vote") vote: Vote
  ): Promise<Post> {
    let post: Awaited<Post>;
    if (vote === "like") {
      post = await this.postsService.likePost(currentUser.user.id, id);
    } else if (vote === "dislike") {
      post = await this.postsService.dislikePost(currentUser.user.id, id);
    } else {
      post = await this.postsService.removeVote(currentUser.user.id, id);
    }

    if (vote === "like") {
      await this.novu.trigger("post-like", {
        to: {
          subscriberId: post.user.id,
        },
        payload: {
          postId: post.id,
          name: currentUser.user.name,
        },
      });
    }

    return post;
  }

  @Mutation(() => Post, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
  ): Promise<Post> {
    const post = await this.postsService.remove(currentUser.user.id, id);

    if (!post) {
      throw new NotFoundException(id);
    }

    return post;
  }

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  async postsByTag(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("tag") tag: string,
    @Args() pagination: PaginationArgs
  ): Promise<Post[]> {
    return await this.postsService.getPostsByTag(
      currentUser.user.id,
      tag,
      pagination
    );
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async bulkCreatePosts(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("payload") payload: BulkCreatePostsInput
  ): Promise<string> {
    await this.postsQueue.add("createPost", {
      userId: currentUser.user.id,
      dtos: payload.posts,
    });

    return `Queued ${
      payload.posts.length
    } items at ${new Date().toISOString()}`;
  }
}
