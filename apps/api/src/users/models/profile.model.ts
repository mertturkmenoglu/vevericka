import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType({ description: 'ProfileMeta' })
export class ProfileMeta {
  @Field()
  isMe!: boolean;

  @Field()
  isFollowing!: boolean;

  @Field()
  hasPendingFollowRequest!: boolean;
}

@ObjectType({ description: 'ProfileDescriptionTag' })
export class ProfileDescriptionTag {
  @Field()
  id!: string;

  @Field()
  userId!: string;

  @Field()
  tagId!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;
}

@ObjectType({ description: 'ProfileDescriptionUrl' })
export class ProfileDescriptionUrl {
  @Field()
  id!: string;

  @Field()
  userId!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;

  @Field(() => String)
  meta!: unknown;

  @Field()
  url!: string;
}

@ObjectType({ description: 'ProfileDescriptionMention' })
export class ProfileDescriptionMention {
  @Field()
  id!: string;

  @Field()
  userId!: string;

  @Field()
  start!: number;

  @Field()
  end!: number;

  @Field()
  mention!: string;

  @Field(() => String, { nullable: true })
  mentionedUserId!: string | null;
}

@ObjectType({ description: 'ProfileDescription' })
export class ProfileDescription {
  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => [ProfileDescriptionTag])
  tags!: ProfileDescriptionTag[];

  @Field(() => [ProfileDescriptionUrl])
  urls!: ProfileDescriptionUrl[];

  @Field(() => [ProfileDescriptionMention])
  mentions!: ProfileDescriptionMention[];
}

@ObjectType({ description: 'user' })
export class Profile extends User {
  @Field(() => ProfileMeta)
  meta!: ProfileMeta;
}
