import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostDocument {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  name: string;
}
