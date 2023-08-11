import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "PostImage" })
export class PostImage {
  @Field()
  id!: string;

  @Field()
  url!: string;

  @Field()
  postId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
