import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '@/db/tables/users';
import { posts } from '@/db/tables/posts';
import { InferModel } from 'drizzle-orm';

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
