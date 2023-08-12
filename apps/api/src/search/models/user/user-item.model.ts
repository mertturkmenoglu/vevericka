import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserItem {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  verified!: boolean;

  @Field()
  protected!: boolean;
}
