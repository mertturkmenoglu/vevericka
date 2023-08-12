import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'PostVideo' })
export class PostVideo {
  @Field()
  id!: string;

  @Field()
  url!: string;
}
