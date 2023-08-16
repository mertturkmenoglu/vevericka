import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@/users/models/user.model';
import { TextMeta } from '@/common/models/text-meta.model';

@ObjectType({ description: 'Post Attachment' })
export class PostAttachment {
  @Field()
  type!: string;

  @Field()
  url!: string;

  @Field(() => Number, { nullable: true })
  width!: number | null;

  @Field(() => Number, { nullable: true })
  height!: number | null;

  @Field()
  order!: number;
}

@ObjectType({ description: 'Post Image Attachment' })
export class PostImageAttachment extends PostAttachment {}

@ObjectType({ description: 'Post Video Attachment' })
export class PostVideoAttachment extends PostAttachment {
  @Field(() => Number, { nullable: true })
  duration!: number | null;
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

  @Field(() => TextMeta)
  meta!: TextMeta;

  @Field(() => [PostAttachment])
  attachments!: PostAttachment[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
