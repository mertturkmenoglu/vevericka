import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/models/user.model";

@ObjectType()
export class Story {
  @Field()
  id!: string;

  @Field()
  user!: User;

  @Field(() => Int)
  duration!: number;

  @Field()
  source!: string;

  @Field()
  seen!: boolean;

  @Field()
  endsAt!: Date;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
