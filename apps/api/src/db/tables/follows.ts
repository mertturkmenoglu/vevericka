import { boolean, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '@/db/tables/users';

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

export const follows = pgTable('follows', {
  id: uuid('id').primaryKey().defaultRandom(),
  followingId: uuid('following_id')
    .references(() => users.id)
    .notNull(),
  followerId: uuid('follower_id')
    .references(() => users.id)
    .notNull(),
});
