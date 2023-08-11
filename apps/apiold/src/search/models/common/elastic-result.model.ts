import { Field, ObjectType } from "@nestjs/graphql";
import { Shard } from "./shard.model";

@ObjectType()
export class ElasticResult {
  @Field()
  took!: number;

  @Field()
  timed_out!: boolean;

  @Field(() => Shard)
  _shards!: Shard;
}
