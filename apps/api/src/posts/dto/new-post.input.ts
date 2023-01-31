import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class NewPostInput {
  @Field()
  @MaxLength(255)
  content: string;
}
