import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostItem {
  @Field()
  id!: string;

  @Field()
  content!: string;

  @Field()
  userId!: string;
}
