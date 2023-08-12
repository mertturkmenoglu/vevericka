import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from '@/db/tables/users';
import { InferModel } from 'drizzle-orm';

export const postVotesEnum = pgEnum('post_votes_enum', ['like', 'dislike']);

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

export type TPost = InferModel<typeof posts>;

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
