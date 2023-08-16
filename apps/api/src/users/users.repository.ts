import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import {
  followRequests,
  follows,
  TNewUser,
  TUser,
  TUserProfile,
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

      const isFollowingResults = await tx
        .select({ count: sql<number>`count(*)` })
        .from(follows)
        .where(
          and(eq(follows.followerId, thisUserId), eq(follows.followingId, id)),
        );

      const hasPendingFollowRequestResults = await tx
        .select({ count: sql<number>`count(*)` })
        .from(followRequests)
        .where(
          and(
            eq(followRequests.fromId, thisUserId),
            eq(followRequests.toId, id),
          ),
        );

      return {
        users: usersResults,
        isFollowing: isFollowingResults[0].count > 0,
        hasPendingFollowRequest: hasPendingFollowRequestResults[0].count > 0,
      };
    });

    if (!results) {
      return null;
    }

    if (results.users.length === 0) {
      return null;
    }

    const user = results.users[0];

    return {
      ...user,
      meta: {
        isMe: thisUserId === id,
        isFollowing: results.isFollowing,
        hasPendingFollowRequest: results.hasPendingFollowRequest,
      },
    };
  }

  async findOneUserByAuthId(authId: string): Promise<TUser | null> {
    const results = await this.db.client
      .select()
      .from(users)
      .where(eq(users.authId, authId))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async findOneUserById(id: string): Promise<TUser | null> {
    const results = await this.db.client
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async createOneUser(payload: TNewUser): Promise<TUser | null> {
    const results = await this.db.client
      .insert(users)
      .values(payload)
      .returning();

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }
}
