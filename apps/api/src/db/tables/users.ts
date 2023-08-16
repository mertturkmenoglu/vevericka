import {
  boolean,
  date,
  integer,
  json,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { auths, TTextMeta } from '@/db/tables';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 256 }).notNull().unique(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  image: varchar('image', { length: 256 }).notNull().default('profile.png'),
  job: varchar('job', { length: 256 }),
  twitterHandle: varchar('twitter_handle', { length: 256 }),
  school: varchar('school', { length: 256 }),
  birthDate: date('birth_date'),
  website: varchar('website', { length: 256 }),
  description: varchar('description', { length: 256 }),
  descriptionMeta: json('description_meta').$type<TTextMeta>(),
  verified: boolean('verified').default(false).notNull(),
  protected: boolean('protected').default(false).notNull(),
  banner: varchar('banner', { length: 256 }).notNull().default('banner.png'),
  gender: varchar('gender', { length: 256 }),
  location: varchar('location', { length: 256 }),
  postsCount: integer('posts_count').default(0).notNull(),
  followersCount: integer('followers_count').default(0).notNull(),
  followingCount: integer('following_count').default(0).notNull(),
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

export type TNewUser = InferModel<typeof users, 'insert'>;
export type TUser = InferModel<typeof users>;

export type TUserProfileMeta = {
  isFollowing: boolean;
  hasPendingFollowRequest: boolean;
  isMe: boolean;
};

export type TUserProfile = TUser & { meta: TUserProfileMeta };
