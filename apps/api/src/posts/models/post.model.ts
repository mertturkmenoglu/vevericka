import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "C" })
class C {
  @Field((type) => Number)
  id: number;
}

@ObjectType({ description: "post" })
export class Post {
  @Field((type) => Number)
  id: number;

  @Field()
  content: string;

  @Field()
  userId: number;

  @Field((type) => [C])
  comments: C[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
