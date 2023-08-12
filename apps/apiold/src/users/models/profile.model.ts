import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType({ description: "UserCount" })
export class UserCount {
  @Field()
  followers!: number;

  @Field()
  following!: number;

  @Field()
  posts!: number;
}

@ObjectType({ description: "user" })
export class Profile extends User {
  @Field(() => UserCount)
  _count!: UserCount;

  @Field()
  isFollowing!: boolean;

  @Field()
  hasPendingFollowRequest!: boolean;

  @Field()
  isMe!: boolean;
}