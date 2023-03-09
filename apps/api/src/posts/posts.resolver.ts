import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { NewPostInput } from "./dto/new-post.input";
import { Post } from "./models/post.model";
import { PostsService } from "./posts.service";

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  async getPost(@Args("id") id: string): Promise<Post> {
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException(id);
    }
    return post;
  }

  @Query(() => [Post])
  getPosts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  async createPost(
    @Args("newPostData") newPostData: NewPostInput
  ): Promise<Post> {
    const post = await this.postsService.create(newPostData);
    return post;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args("id") id: string) {
    return this.postsService.remove(id);
  }
}
