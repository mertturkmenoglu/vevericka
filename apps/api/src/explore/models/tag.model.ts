import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "../../posts/models/post.model";

@ObjectType({ description: "tag" })
export class Tag {
  @Field()
  id: number;

  @Field()
  tagName: string;

  @Field(() => [Post])
  posts: Post[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
