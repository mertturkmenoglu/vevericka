import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType({ description: "PostVideo" })
export class PostVideo {
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
