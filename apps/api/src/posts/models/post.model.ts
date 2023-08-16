import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/users/models/user.model';

@ObjectType({ description: 'Tag' })
export class PTag {
  @Field()
  id!: string;

  @Field()
  tag!: string;
}

@ObjectType({ description: 'Post Tag' })
export class PostTag {
  @Field()
  id!: string;

  @Field()
  tagId!: string;

  @Field(() => PTag)
  tag!: PTag;

  @Field()
  start!: number;

  @Field()
  end!: number;
}

@ObjectType({ description: 'Post Url' })
export class PostUrl {
  @Field()
  id!: string;

  @Field()
  url!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;

  @Field()
  meta!: string;
}

@ObjectType({ description: 'Post Mention' })
export class PostMention {
  @Field()
  id!: string;

  @Field()
  mention!: string;

  @Field(() => String, { nullable: true })
  mentionedUserId!: string | null;

  @Field()
  start!: number;

  @Field()
  end!: number;
}

@ObjectType({ description: 'Post Attachment' })
export class PostAttachment {
  @Field()
  id!: string;

  @Field()
  type!: string;

  @Field()
  url!: string;

  @Field(() => Number, { nullable: true })
  width!: number | null;

  @Field(() => Number, { nullable: true })
  height!: number | null;

  @Field(() => Number, { nullable: true })
  duration!: number | null;

  @Field()
  order!: number;
}

@ObjectType({ description: 'Post Poll Option' })
export class PostPollOption {
  @Field()
  id!: string;

  @Field()
  option!: string;

  @Field()
  order!: number;
}

@ObjectType({ description: 'Post Poll' })
export class PostPoll {
  @Field()
  id!: string;

  @Field()
  start!: Date;

  @Field()
  end!: Date;

  @Field(() => [PostPollOption])
  options!: PostPollOption[];
}

@ObjectType({ description: 'post' })
export class Post {
  @Field()
  id!: string;

  @Field(() => String, { nullable: true })
  content!: string | null;

  @Field(() => String, { nullable: true })
  source!: string | null;

  @Field(() => String, { nullable: true })
  location!: string | null;

  @Field()
  sensitive!: boolean;

  @Field(() => String, { nullable: true })
  referenceId!: string | null;

  @Field(() => String, { nullable: true })
  referenceType!: string | null;

  @Field()
  replySetting!: string;

  @Field(() => String, { nullable: true })
  userId!: string | null;

  @Field(() => User)
  user!: User;

  @Field(() => [PostTag])
  tags!: PostTag[];

  @Field(() => PostPoll, { nullable: true })
  poll!: PostPoll | null;

  @Field(() => [PostAttachment])
  attachments!: PostAttachment[];

  @Field(() => [PostMention])
  mentions!: PostMention[];

  @Field(() => [PostUrl])
  urls!: PostUrl[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
