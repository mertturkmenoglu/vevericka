import {
  boolean,
  index,
  json,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { users } from '@/db/tables/users';
import { InferModel } from 'drizzle-orm';

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

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    content: varchar('content', { length: 256 }),
    source: varchar('source', { length: 32 }),
    location: varchar('location', { length: 32 }),
    sensitive: boolean('sensitive').notNull().default(false),
    referenceId: uuid('reference_id').references((): AnyPgColumn => posts.id),
    referenceType: postReferencesEnum('reference_type'),
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
  },
  (t) => {
    return {
      authorIdx: index('author_idx').on(t.userId),
      referenceIdx: index('reference_idx').on(t.referenceId),
    };
  },
);

export type TPost = InferModel<typeof posts>;
export type TNewPost = InferModel<typeof posts, 'insert'>;

export const postVotes = pgTable(
  'post_votes',
  {
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
  },
  (t) => {
    return {
      userIdx: index('user_idx').on(t.userId),
      postIdx: index('post_idx').on(t.postId),
    };
  },
);

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tag: varchar('tag', { length: 256 }).notNull().unique(),
  },
  (t) => {
    return {
      tagIdx: uniqueIndex('tag_idx').on(t.tag),
    };
  },
);

export const postTags = pgTable(
  'post_tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => posts.id)
      .notNull(),
    tagId: uuid('tag_id')
      .references(() => tags.id)
      .notNull(),
    start: smallint('start').notNull(),
    end: smallint('end').notNull(),
  },
  (t) => {
    return {
      postIdx: index('post_idx').on(t.postId),
      tagIdx: index('tag_idx').on(t.tagId),
    };
  },
);

export const postUrls = pgTable(
  'post_urls',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => posts.id)
      .notNull(),
    url: varchar('url', { length: 256 }).notNull(),
    start: smallint('start').notNull(),
    end: smallint('end').notNull(),
    meta: json('meta').notNull(),
  },
  (t) => {
    return {
      postIdx: index('post_idx').on(t.postId),
    };
  },
);

export const postMentions = pgTable(
  'post_mentions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => posts.id)
      .notNull(),
    mention: varchar('mention', { length: 256 }).notNull(),
    mentionedUserId: uuid('mentioned_user_id').references(() => users.id),
    start: smallint('start').notNull(),
    end: smallint('end').notNull(),
  },
  (t) => {
    return {
      postIdx: index('post_idx').on(t.postId),
      mentionedUserIdx: index('mentioned_user_idx').on(t.mentionedUserId),
    };
  },
);

export const postAttachments = pgTable(
  'post_attachments',
  {
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
  },
  (t) => {
    return {
      postIdx: index('post_idx').on(t.postId),
    };
  },
);

export const polls = pgTable(
  'poll',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => posts.id)
      .notNull(),
    start: timestamp('start', { withTimezone: true }).notNull(),
    end: timestamp('end', { withTimezone: true }).notNull(),
  },
  (t) => {
    return {
      postIdx: index('post_idx').on(t.postId),
    };
  },
);

export const pollOptions = pgTable(
  'poll_options',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    pollId: uuid('poll_id')
      .references(() => polls.id)
      .notNull(),
    option: varchar('option', { length: 32 }).notNull(),
    order: smallint('order').notNull(),
  },
  (t) => {
    return {
      pollIdx: index('poll_idx').on(t.pollId),
    };
  },
);

export const pollVotes = pgTable(
  'poll_votes',
  {
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
  },
  (t) => {
    return {
      pollIdx: index('poll_idx').on(t.pollId),
      userIdx: index('user_idx').on(t.userId),
      optionIdx: index('option_idx').on(t.optionId),
    };
  },
);
