import { Field, ObjectType } from "@nestjs/graphql";
import { Result } from "./result.model";
import { ElapsedTime } from "./elapsed-time.model";

@ObjectType()
export class Results {
  @Field()
  count: number;

  @Field(() => [Result])
  hits: Result[];

  @Field(() => ElapsedTime)
  elapsed: ElapsedTime;
}
