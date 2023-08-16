import { relations } from 'drizzle-orm';
import { users } from '@/db/tables/users';
import { polls, posts, postVotes } from '@/db/tables/posts';

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  reference: one(posts, {
    fields: [posts.referenceId],
    references: [posts.id],
  }),
  votes: many(postVotes),
  poll: one(polls),
}));

export const postVotesRelations = relations(postVotes, ({ one }) => ({
  user: one(users, {
    fields: [postVotes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [postVotes.postId],
    references: [posts.id],
  }),
}));

export const postPollRelations = relations(polls, ({ one }) => ({
  post: one(posts, {
    fields: [polls.postId],
    references: [posts.id],
  }),
}));
