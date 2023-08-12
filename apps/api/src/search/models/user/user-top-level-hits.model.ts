import { Field, ObjectType } from '@nestjs/graphql';
import { TopLevelHits } from '../common/top-level-hits.model';
import { UserHit } from './user-hit.model';

@ObjectType()
export class UserTopLevelHits extends TopLevelHits {
  @Field(() => [UserHit])
  hits!: UserHit[];
}
