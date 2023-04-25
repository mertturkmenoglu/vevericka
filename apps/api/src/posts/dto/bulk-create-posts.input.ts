import { Field, InputType } from "@nestjs/graphql";
import { NewPostInput } from "./new-post.input";

@InputType()
export class BulkCreatePostsInput {
  @Field(() => [NewPostInput])
  posts: NewPostInput[];
}
