import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "../../../posts/models/post.model";
import { Hit } from "../common/hit.model";

@ObjectType()
export class PostHit extends Hit {
  @Field(() => Post)
  _source: Post;
}
