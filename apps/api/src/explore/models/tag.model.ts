import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "../../posts/models/post.model";

@ObjectType({ description: "tag" })
export class Tag {
  @Field()
  id: string;

  @Field()
  tagName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
