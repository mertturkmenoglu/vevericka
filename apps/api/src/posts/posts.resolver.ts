import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";
import { PostsService } from "./posts.service";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";
import { Vote } from "./dto/vote-post.input";
import { PaginationArgs } from "src/common/args/pagination.args";

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  async post(@Args("id") id: string): Promise<Post> {
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException(id);
    }
    return post;
  }

  @Query(() => [Post])
  async posts(
    @Args("id") id: string,
    @Args() pagination: PaginationArgs
  ): Promise<Post[]> {
    const posts = await this.postsService.getPostsByUserId(id, pagination);
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
    if (vote === "like") {
      return this.postsService.likePost(currentUser.user.id, id);
    } else if (vote === "dislike") {
      return this.postsService.dislikePost(currentUser.user.id, id);
    } else {
      return this.postsService.removeVote(currentUser.user.id, id);
    }
  }

  @Mutation(() => Post, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async deletePost(@Args("id") id: string): Promise<Post> {
    const post = await this.postsService.remove(id);

    if (!post) {
      throw new NotFoundException(id);
    }

    return post;
  }
}
