import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Poll {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  endsAt: Date;

  @Field(() => String)
  choices: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
