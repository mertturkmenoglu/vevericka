import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Shard {
  @Field()
  total: number;

  @Field()
  successful: number;

  @Field({ nullable: true })
  skipped?: number;

  @Field()
  failed: number;
}
