import {
  boolean,
  json,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '@/db/tables/users';
import { InferModel, relations } from 'drizzle-orm';

export const postVotesEnum = pgEnum('post_votes_enum', ['like', 'dislike']);

export const postAttachmentsEnum = pgEnum('post_attachments_enum', [
  'image',
  'video',
]);

export const postReplyTypesEnum = pgEnum('post_reply_types_enum', [
  'default',
  'only-follows',
  'only-mentioned',
  'no-one',
]);

export const postReferencesEnum = pgEnum('post_references_enum', [
  'replied-to',
  'repost',
  'quoted',
]);

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: varchar('content', { length: 256 }).notNull(),
  source: varchar('source', { length: 32 }),
  location: varchar('location', { length: 32 }),
  sensitive: boolean('sensitive').notNull().default(false),
  replySetting: postReplyTypesEnum('reply_setting')
    .notNull()
    .default('default'),
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

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const postReferences = pgTable('post_references', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  referenceId: uuid('reference_id')
    .references(() => posts.id)
    .notNull(),
  type: postReferencesEnum('type').notNull(),
});

export const postReferencesRelations = relations(postReferences, ({ one }) => ({
  post: one(posts, {
    fields: [postReferences.postId],
    references: [posts.id],
  }),
  reference: one(posts, {
    fields: [postReferences.referenceId],
    references: [posts.id],
  }),
}));

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
  tagId: uuid('tag_id')
    .references(() => tags.id)
    .notNull(),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
});

export const postUrls = pgTable('post_urls', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  url: varchar('url', { length: 256 }).notNull(),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
  meta: json('meta').notNull(),
});

export const postMentions = pgTable('post_mentions', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  mention: varchar('mention', { length: 256 }).notNull(),
  mentionedUserId: uuid('mentioned_user_id').references(() => users.id),
  start: smallint('start').notNull(),
  end: smallint('end').notNull(),
});

export const postAttachments = pgTable('post_attachments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  type: postAttachmentsEnum('type').notNull(),
  url: varchar('url', { length: 256 }).notNull(),
  width: smallint('width'),
  height: smallint('height'),
  duration: smallint('duration'),
  order: smallint('order').notNull(),
});

export const polls = pgTable('poll', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .references(() => posts.id)
    .notNull(),
  start: timestamp('start', { withTimezone: true }).notNull(),
  end: timestamp('end', { withTimezone: true }).notNull(),
});

export const pollOptions = pgTable('poll_options', {
  id: uuid('id').primaryKey().defaultRandom(),
  pollId: uuid('poll_id')
    .references(() => polls.id)
    .notNull(),
  option: varchar('option', { length: 32 }).notNull(),
  order: smallint('order').notNull(),
});

export const pollVotes = pgTable('poll_votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  pollId: uuid('poll_id')
    .references(() => polls.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  optionId: uuid('option_id')
    .references(() => pollOptions.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
