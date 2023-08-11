import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewBookmarkInput {
  @Field()
  postId!: string;
}
