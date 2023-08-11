import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Hit {
  @Field()
  _index!: string;

  @Field()
  _id!: string;

  @Field({ nullable: true })
  _score?: number;
}
