import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Example' })
export class Example {
  @Field()
  id!: string;
}
