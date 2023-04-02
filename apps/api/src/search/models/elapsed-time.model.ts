import { Field, ObjectType } from '@nestjs/graphql';

// @ts-ignore
import { ElapsedTime as OramaElapsedTime } from '@orama/orama';

@ObjectType()
export class ElapsedTime implements OramaElapsedTime {
  @Field()
  raw: number;

  @Field()
  formatted: string;
}