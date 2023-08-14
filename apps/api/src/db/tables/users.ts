import {
  boolean,
  date,
  json,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { auths } from '@/db/tables/auths';
import { tags } from '@/db';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  image: varchar('image', { length: 256 }).notNull().default('profile.png'),
  job: varchar('job', { length: 256 }),
  twitterHandle: varchar('twitter_handle', { length: 256 }),
  school: varchar('school', { length: 256 }),
  birthDate: date('birth_date'),
  website: varchar('website', { length: 256 }),
  description: varchar('description', { length: 256 }),
  verified: boolean('verified').default(false).notNull(),
  protected: boolean('protected').default(false).notNull(),
  banner: varchar('banner', { length: 256 }).notNull().default('banner.png'),
  gender: varchar('gender', { length: 256 }),
  location: varchar('location', { length: 256 }),
  authId: uuid('auth_id')
    .references(() => auths.id)
    .notNull(),
  pinnedPostId: uuid('pinned_post_id').references(() => auths.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userDescriptionTags = pgTable('user_description_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  tagId: uuid('tag_id')
    .references(() => tags.id)
    .notNull(),
});

export type TUserDescriptionTag = InferModel<typeof userDescriptionTags>;

export const userDescriptionUrls = pgTable('user_description_urls', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  url: varchar('url', { length: 256 }).notNull(),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
  meta: json('meta').notNull(),
});

export type TUserDescriptionUrl = InferModel<typeof userDescriptionUrls>;

export const userDescriptionMentions = pgTable('user_description_mentions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  mention: varchar('mention', { length: 256 }).notNull(),
  mentionedUserId: uuid('mentioned_user_id').references(() => users.id),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
});

export type TUserDescriptionMention = InferModel<
  typeof userDescriptionMentions
>;

export type TUser = InferModel<typeof users>;

export type TUserProfileDescription = {
  descriptionMeta: {
    description: string | null;
    tags: TUserDescriptionTag[];
    urls: TUserDescriptionUrl[];
    mentions: TUserDescriptionMention[];
  };
};

export type TUserProfileCount = {
  followers: number;
  following: number;
  posts: number;
};

export type TUserProfileMeta = {
  isFollowing: boolean;
  hasPendingFollowRequest: boolean;
  isMe: boolean;
  count: TUserProfileCount;
};

export type TUserProfile = TUser &
  TUserProfileDescription & { meta: TUserProfileMeta };
