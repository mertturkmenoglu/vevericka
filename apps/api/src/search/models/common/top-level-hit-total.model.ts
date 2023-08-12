import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TopLevelHitTotal {
  @Field()
  value!: number;

  @Field()
  relation!: string;
}
