import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import {
  followRequests,
  follows,
  TUserProfile,
  userDescriptionMentions,
  userDescriptionTags,
  userDescriptionUrls,
  users,
} from '@/db/tables';
import { and, eq, sql } from 'drizzle-orm';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DbService) {}

  async findOneProfileById(
    thisUserId: string,
    id: string,
  ): Promise<TUserProfile | null> {
    const results = await this.db.client.transaction(async (tx) => {
      const usersResults = await tx
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (usersResults.length === 0) {
        return null;
      }

      const tagsResults = await tx
        .select()
        .from(userDescriptionTags)
        .where(eq(userDescriptionTags.userId, id));

      const urlsResults = await tx
        .select()
        .from(userDescriptionUrls)
        .where(eq(userDescriptionUrls.userId, id));

      const mentionsResults = await tx
        .select()
        .from(userDescriptionMentions)
        .where(eq(userDescriptionMentions.userId, id));

      const followersCount = usersResults[0].followersCount;
      const followingCount = usersResults[0].followingCount;
      const postsCount = usersResults[0].postsCount;

      const isFollowingResults = await tx
        .select({ count: sql<number>`count(*)` })
        .from(follows)
        .where(
          and(eq(follows.followerId, thisUserId), eq(follows.followingId, id)),
        );

      const isFollowing = isFollowingResults[0].count > 0;

      const hasPendingFollowRequestResults = await tx
        .select({ count: sql<number>`count(*)` })
        .from(followRequests)
        .where(
          and(
            eq(followRequests.fromId, thisUserId),
            eq(followRequests.toId, id),
          ),
        );

      const hasPendingFollowRequest =
        hasPendingFollowRequestResults[0].count > 0;

      return {
        users: usersResults,
        user_description_tags: tagsResults,
        user_description_urls: urlsResults,
        user_description_mentions: mentionsResults,
        followers_count: followersCount,
        following_count: followingCount,
        posts_count: postsCount,
        is_following: isFollowing,
        has_pending_follow_request: hasPendingFollowRequest,
      };
    });

    if (!results) {
      return null;
    }

    if (results.users.length === 0) {
      return null;
    }

    const user = results.users[0];
    const tags = results.user_description_tags;
    const urls = results.user_description_urls;
    const mentions = results.user_description_mentions;
    const followersCount = results.followers_count;
    const followingCount = results.following_count;
    const postsCount = results.posts_count;
    const isFollowing = results.is_following;
    const hasPendingFollowRequest = results.has_pending_follow_request;

    return {
      ...user,
      descriptionMeta: {
        description: user.description,
        tags,
        urls,
        mentions,
      },
      meta: {
        isMe: thisUserId === id,
        isFollowing,
        hasPendingFollowRequest,
        count: {
          followers: followersCount,
          following: followingCount,
          posts: postsCount,
        },
      },
    };
  }
}
