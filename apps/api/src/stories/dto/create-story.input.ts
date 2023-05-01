import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStoryInput {
  @Field()
  source: string;

  @Field()
  duration: number;

  @Field()
  endsAt: Date;
}
