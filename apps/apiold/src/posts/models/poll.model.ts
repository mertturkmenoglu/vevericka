import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Poll {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  endsAt!: Date;

  @Field()
  choices!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
