import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Tag Count" })
export class TagCount {
  @Field()
  posts!: number;
}

@ObjectType({ description: "tag" })
export class Tag {
  @Field()
  id!: string;

  @Field()
  tagName!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType({ description: "Popular Tag" })
export class PopularTag extends Tag {
  @Field(() => TagCount)
  _count!: TagCount;
}
