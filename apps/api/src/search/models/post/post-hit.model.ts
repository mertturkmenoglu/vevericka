import { Field, ObjectType } from '@nestjs/graphql';
import { Hit } from '../common/hit.model';
import { Post } from '@/posts/models/post.model';

@ObjectType()
export class PostHit extends Hit {
  @Field(() => Post)
  _source!: Post;
}
