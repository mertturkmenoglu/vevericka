import { Field, ObjectType } from '@nestjs/graphql';
import { ElasticResult } from '../common/elastic-result.model';
import { PostTopLevelHits } from './post-top-level-hits.model';

@ObjectType()
export class PostResult extends ElasticResult {
  @Field(() => PostTopLevelHits)
  hits!: PostTopLevelHits;
}
