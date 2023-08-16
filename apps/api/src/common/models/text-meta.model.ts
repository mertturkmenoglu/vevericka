import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'TextMeta' })
export class TextMeta {
  @Field(() => [MentionEntity])
  mentions!: MentionEntity[];

  @Field(() => [TagEntity])
  tags!: TagEntity[];

  @Field(() => [UrlEntity])
  urls!: UrlEntity[];
}

@ObjectType({ description: 'MentionEntity' })
export class MentionEntity {
  @Field()
  username!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;

  @Field(() => String, { nullable: true })
  referenceId!: string | null;
}

@ObjectType({ description: 'TagEntity' })
export class TagEntity {
  @Field()
  id!: string;

  @Field()
  tag!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;
}

@ObjectType({ description: 'UrlEntity' })
export class UrlEntity {
  @Field()
  url!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;

  @Field(() => UrlEntityMeta, { nullable: true })
  meta!: UrlEntityMeta | null;
}

@ObjectType({ description: 'UrlEntityMeta' })
export class UrlEntityMeta {
  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  image!: string | null;
}
