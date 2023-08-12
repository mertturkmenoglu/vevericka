import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TopLevelHits {
  @Field({ nullable: true })
  max_score?: number;
}
