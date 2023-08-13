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

export const userDescriptions = pgTable('user_descriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  description: varchar('description', { length: 256 }).notNull(),
});

export const userDescriptionTags = pgTable('user_description_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  userDescriptionId: uuid('user_description_id')
    .references(() => userDescriptions.id)
    .notNull(),
  tagId: uuid('tag_id')
    .references(() => tags.id)
    .notNull(),
});

export const userDescriptionUrls = pgTable('user_description_urls', {
  id: uuid('id').primaryKey().defaultRandom(),
  userDescriptionId: uuid('user_description_id')
    .references(() => userDescriptions.id)
    .notNull(),
  url: varchar('url', { length: 256 }).notNull(),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
  meta: json('meta').notNull(),
});

export const userDescriptionMentions = pgTable('user_description_mentions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userDescriptionId: uuid('user_description_id')
    .references(() => userDescriptions.id)
    .notNull(),
  mention: varchar('mention', { length: 256 }).notNull(),
  mentionedUserId: uuid('mentioned_user_id').references(() => users.id),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
});

export type TUser = InferModel<typeof users>;
