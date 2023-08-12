import {
  boolean,
  date,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { InferModel } from 'drizzle-orm';

export const authProvidersEnum = pgEnum('auth_providers', [
  'discord',
  'google',
  'spotify',
]);

export const postVotesEnum = pgEnum('post_votes_enum', ['like', 'dislike']);

export const auths = pgTable('auths', {
  id: uuid('id').primaryKey().defaultRandom(),
  sub: varchar('sub', { length: 256 }).notNull(),
  type: authProvidersEnum('type').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TAuth = InferModel<typeof auths>;

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
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TUser = InferModel<typeof users>;

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: varchar('content', { length: 256 }).notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const postVotes = pgTable('post_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  vote: postVotesEnum('vote').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  tag: varchar('tag', { length: 256 }).notNull(),
});

export const postTags = pgTable('post_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  tag: varchar('tag', { length: 256 }).notNull(),
});

export const postImages = pgTable('post_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  image: varchar('image', { length: 256 }).notNull(),
});

export const postVideos = pgTable('post_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  video: varchar('video', { length: 256 }).notNull(),
});

export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TBookmark = InferModel<typeof bookmarks>;

export const followRequests = pgTable('follow_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  fromId: uuid('from_id')
    .references(() => users.id)
    .notNull(),
  toId: uuid('to_id')
    .references(() => users.id)
    .notNull(),
  accepted: boolean('accepted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
