import {
  boolean,
  index,
  json,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
  AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { users } from '@/db/tables/users';
import { InferModel } from 'drizzle-orm';
import { TTextMeta } from '@/db/tables/types';

export const postVotesEnum = pgEnum('post_votes_enum', ['like', 'dislike']);

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

export type TPostAttachment = {
  url: string;
  height: number | null;
  width: number | null;
  order: number;
} & ({ type: 'image' } | { type: 'video'; duration: number | null });

export type TPostPollOption = {
  option: string;
  order: number;
  count: number;
};

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
    meta: json('meta').$type<TTextMeta>().notNull(),
    attachments: json('attachments').$type<TPostAttachment[]>().notNull(),
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

export const polls = pgTable(
  'poll',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => posts.id)
      .notNull(),
    start: timestamp('start', { withTimezone: true }).notNull(),
    end: timestamp('end', { withTimezone: true }).notNull(),
    options: json('options').$type<TPostPollOption[]>(),
  },
  (t) => {
    return {
      postIdx: index('post_idx').on(t.postId),
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
    option: smallint('option').notNull(),
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
    };
  },
);
