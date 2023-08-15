import { relations } from 'drizzle-orm';
import { users } from '@/db/tables/users';
import {
  polls,
  postAttachments,
  postMentions,
  posts,
  postTags,
  postUrls,
  postVotes,
  tags,
} from '@/db/tables/posts';

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  votes: many(postVotes),
  tags: many(postTags),
  urls: many(postUrls),
  mentions: many(postMentions),
  attachments: many(postAttachments),
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

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

export const postUrlsRelations = relations(postUrls, ({ one }) => ({
  post: one(posts, {
    fields: [postUrls.postId],
    references: [posts.id],
  }),
}));

export const postMentionsRelations = relations(postMentions, ({ one }) => ({
  post: one(posts, {
    fields: [postMentions.postId],
    references: [posts.id],
  }),
}));

export const postAttachmentsRelations = relations(
  postAttachments,
  ({ one }) => ({
    post: one(posts, {
      fields: [postAttachments.postId],
      references: [posts.id],
    }),
  }),
);

export const postPollRelations = relations(polls, ({ one }) => ({
  post: one(posts, {
    fields: [polls.postId],
    references: [posts.id],
  }),
}));
