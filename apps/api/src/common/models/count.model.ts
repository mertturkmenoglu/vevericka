import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Count" })
export class Count {
  @Field()
  dislikes: number;

  @Field()
  likes: number;

  @Field()
  tags: number;

  @Field()
  comments: number;
}
