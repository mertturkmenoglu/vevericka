import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common/args/pagination.args';
import { Vote } from './dto/vote-post.input';
import { DbService } from '@/db/db.service';
import { posts, postVotes } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

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
    return null;
    // return this.prisma.post.findUnique({
    //   where: {
    //     id,
    //   },
    //   include: {
    //     ...postsInclude,
    //     ...postsVoteInclude(userId),
    //   },
    // });
  }

  async deleteOneById(id: string): Promise<void> {
    await this.db.client.delete(posts).where(eq(posts.id, id));
  }

  async findManyByThisUserIdAndUserId(
    thisUserId: string,
    targetUserId: string,
    { skip, take }: PaginationArgs,
  ): Promise<any[]> {
    return [];
    // return this.prisma.post.findMany({
    //   where: {
    //     userId,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    //   include: {
    //     ...postsInclude,
    //     ...postsVoteInclude(thisUserId),
    //   },
    //   skip,
    //   take,
    // });
  }
}
