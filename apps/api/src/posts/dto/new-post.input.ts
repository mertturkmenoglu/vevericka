import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @Field(() => String, { nullable: true })
  @MaxLength(255)
  content!: string | null;

  @Field(() => String, { nullable: true })
  source!: string | null;

  @Field(() => String, { nullable: true })
  location!: string | null;

  @Field(() => Boolean, { nullable: true })
  sensitive!: boolean | null;

  @Field(() => String, { nullable: true })
  referenceId!: string | null;

  @Field(() => String, { nullable: true })
  referenceType!: string | null;

  @Field(() => String, { nullable: true })
  replySetting!: string | null;

  @Field(() => [NewPostAttachmentInput])
  attachments!: NewPostAttachmentInput[];

  @Field(() => NewPostPollInput, { nullable: true })
  poll!: NewPostPollInput | null;
}

@InputType()
export class NewPostAttachmentInput {
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

@InputType()
export class NewPostPollInput {
  @Field()
  start!: Date;

  @Field()
  end!: Date;

  @Field(() => [NewPostPollOptionInput])
  options!: NewPostPollOptionInput[];
}

@InputType()
export class NewPostPollOptionInput {
  @Field()
  option!: string;

  @Field()
  order!: number;
}
