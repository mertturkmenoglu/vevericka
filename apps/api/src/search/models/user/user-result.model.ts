import { Field, ObjectType } from '@nestjs/graphql';
import { ElasticResult } from '../common/elastic-result.model';
import { UserTopLevelHits } from './user-top-level-hits.model';

@ObjectType()
export class UserResult extends ElasticResult {
  @Field(() => UserTopLevelHits)
  hits!: UserTopLevelHits;
}
