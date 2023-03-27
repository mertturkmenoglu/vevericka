import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/models/user.model";

@ObjectType({ description: "C" })
class C {
  @Field()
  id: string;
}

@ObjectType({ description: "post" })
export class Post {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field((type) => [C])
  comments: C[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
