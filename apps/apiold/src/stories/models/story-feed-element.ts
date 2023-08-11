import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/models/user.model";
import { Story } from "./story.model";

@ObjectType()
export class StoryFeedElement {
  @Field(() => User)
  user!: User;

  @Field(() => [Story])
  stories!: Story[];

  @Field()
  hasSeenAll!: boolean;
}
