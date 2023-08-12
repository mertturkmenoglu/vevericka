import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'tag' })
export class Tag {
  @Field()
  id!: string;

  @Field()
  tag!: string;
}

@ObjectType({ description: 'Popular Tag' })
export class PopularTag extends Tag {
  @Field()
  count!: number;
}
