import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Link Preview Model' })
export class LinkPreview {
  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  image!: string | null;

  @Field(() => String, { nullable: true })
  url!: string | null;
}
