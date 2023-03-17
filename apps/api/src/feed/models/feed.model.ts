import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "../../posts/models/post.model";

@ObjectType()
export class FieldPosts {
  @Field(() => [Post])
  edges: Post[];
}

@ObjectType({ description: "feed" })
export class Feed {
  @Field(() => [Post])
  posts: Post[];
}
