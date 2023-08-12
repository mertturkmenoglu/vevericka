import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LastSeen {
  @Field()
  id!: string;

  @Field()
  date!: string;
}
