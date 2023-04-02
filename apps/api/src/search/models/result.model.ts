import { Field, ObjectType, createUnionType } from "@nestjs/graphql";
import { PostDocument } from "./post-document.model";

@ObjectType()
export class Result {
  @Field()
  id: string;

  @Field()
  score: number;

  @Field(() => PostDocument)
  document: PostDocument;
}
