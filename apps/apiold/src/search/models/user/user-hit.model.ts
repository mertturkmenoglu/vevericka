import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../../users/models/user.model";
import { Hit } from "../common/hit.model";

@ObjectType()
export class UserHit extends Hit {
  @Field(() => User)
  _source!: User;
}
