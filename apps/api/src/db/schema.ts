import {
  boolean,
  date,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const authProvidersEnum = pgEnum('auth_providers', [
  'discord',
  'google',
  'spotify',
]);

export const auths = pgTable('auths', {
  id: uuid('id').primaryKey(),
  sub: varchar('sub', { length: 256 }),
  type: authProvidersEnum('type'),
  userId: uuid('user_id'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  image: varchar('image', { length: 256 }).default('profile.png'),
  job: varchar('job', { length: 256 }),
  twitterHandle: varchar('twitter_handle', { length: 256 }),
  school: varchar('school', { length: 256 }),
  birthDate: date('birth_date'),
  website: varchar('website', { length: 256 }),
  description: varchar('description', { length: 256 }),
  verified: boolean('verified').default(false),
  protected: boolean('protected').default(false),
  banner: varchar('banner', { length: 256 }),
  gender: varchar('gender', { length: 256 }),
  location: varchar('location', { length: 256 }),
  authId: uuid('auth_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey(),
  content: varchar('content', { length: 256 }).notNull(),
  userId: uuid('user_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const postLikes = pgTable('post_likes', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  postId: uuid('post_id').references(() => posts.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const postDislikes = pgTable('post_dislikes', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  postId: uuid('post_id').references(() => posts.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey(),
  tag: varchar('tag', { length: 256 }).notNull(),
});

export const postTags = pgTable('post_tags', {
  id: uuid('id').primaryKey(),
  postId: uuid('post_id').references(() => posts.id),
  tagId: uuid('tag_id').references(() => tags.id),
});

export const postImages = pgTable('post_images', {
  id: uuid('id').primaryKey(),
  postId: uuid('post_id').references(() => posts.id),
  image: varchar('image', { length: 256 }).notNull(),
});

export const postVideos = pgTable('post_videos', {
  id: uuid('id').primaryKey(),
  postId: uuid('post_id').references(() => posts.id),
  video: varchar('video', { length: 256 }).notNull(),
});

export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  postId: uuid('post_id').references(() => posts.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const followRequests = pgTable('follow_requests', {
  id: uuid('id').primaryKey(),
  fromId: uuid('from_id').references(() => users.id),
  toId: uuid('to_id').references(() => users.id),
  accepted: boolean('accepted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
