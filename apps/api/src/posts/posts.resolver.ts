import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";
import { PostsService } from "./posts.service";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";

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
