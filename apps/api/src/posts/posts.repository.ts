import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common/args/pagination.args';
import { Vote } from '@/posts/dto';
import { DbService } from '@/db/db.service';
import { posts, postVotes } from '@/db/tables';
import { and, desc, eq } from 'drizzle-orm';

@Injectable()
export class PostsRepository {
  constructor(private readonly db: DbService) {}

  async changeVote(userId: string, postId: string, vote: Vote): Promise<void> {
    const prevVotes = await this.db.client
      .select()
      .from(postVotes)
      .where(and(eq(postVotes.postId, postId), eq(postVotes.userId, userId)));

    // No need for a change
    if (prevVotes.length === 0 && vote === 'none') {
      return;
    }

    // User didn't vote before, but now they are voting
    if (prevVotes.length === 0 && vote !== 'none') {
      await this.db.client.insert(postVotes).values({
        userId,
        postId,
        vote,
      });
      return;
    }

    // User previously voted
    const prevVote = prevVotes[0];

    // User is changing their vote
    // Delete the previous vote
    if (vote === 'none') {
      await this.db.client
        .delete(postVotes)
        .where(eq(postVotes.id, prevVote.id));
      return;
    }

    // User is changing their vote
    // Update the previous vote
    await this.db.client
      .update(postVotes)
      .set({ vote })
      .where(eq(postVotes.id, prevVote.id));
  }

  async findOneById(userId: string, id: string): Promise<any | null> {
    const results = await this.db.client
      .select()
      .from(posts)
      .where(eq(posts.id, id));

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async deleteOneById(id: string): Promise<void> {
    await this.db.client.delete(posts).where(eq(posts.id, id));
  }

  async findManyByThisUserIdAndUserId(
    thisUserId: string,
    targetUserId: string,
    { skip, take }: PaginationArgs,
  ): Promise<any[]> {
    return await this.db.client
      .select()
      .from(posts)
      .where(eq(posts.userId, targetUserId))
      .orderBy(desc(posts.createdAt))
      .limit(take)
      .offset(skip);
  }
}
