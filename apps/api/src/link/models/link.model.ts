import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Link Preview Model' })
export class LinkPreview {
  @Field({ nullable: true })
  title!: string | null;

  @Field({ nullable: true })
  description!: string | null;

  @Field({ nullable: true })
  image!: string | null;

  @Field({ nullable: true })
  url!: string | null;
}
