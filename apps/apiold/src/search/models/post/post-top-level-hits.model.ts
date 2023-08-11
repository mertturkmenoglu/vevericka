import { Field, ObjectType } from "@nestjs/graphql";
import { TopLevelHits } from "../common/top-level-hits.model";
import { PostHit } from "./post-hit.model";

@ObjectType()
export class PostTopLevelHits extends TopLevelHits {
  @Field(() => [PostHit])
  hits!: PostHit[];
}
