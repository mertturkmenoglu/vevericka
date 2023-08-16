import { Injectable } from '@nestjs/common';
import { PaginationArgs } from '@/common/args/pagination.args';
import { NewPostInput, Vote } from '@/posts/dto';
import { DbService } from '@/db/db.service';
import { posts, postVotes, TPost } from '@/db/tables';
import { and, desc, eq } from 'drizzle-orm';
import { extractEntitiesWithIndices } from 'twitter-text';
import { Post } from '@/posts/models';

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

  async findOneById(userId: string, id: string): Promise<Post | null> {
    const res = await this.db.client.query.posts.findMany({
      where: eq(posts.id, id),
      with: {
        user: true,
        votes: true,
        poll: true,
      },
    });

    return res[0];
  }

  async deleteOneById(id: string): Promise<void> {
    await this.db.client.delete(posts).where(eq(posts.id, id));
  }

  async create(data: NewPostInput): Promise<TPost | null> {
    this.checkPossibleInputs(data);

    const text = data.content;
    if (!text) {
      return null;
    }
    const entities = extractEntitiesWithIndices(text);

    for (const e of entities) {
      console.log({ e });
    }
    return null;
  }

  async findManyByThisUserIdAndUserId(
    thisUserId: string,
    targetUserId: string,
    { skip, take }: PaginationArgs,
  ): Promise<any[]> {
    return this.db.client
      .select()
      .from(posts)
      .where(eq(posts.userId, targetUserId))
      .orderBy(desc(posts.createdAt))
      .limit(take)
      .offset(skip);
  }

  private checkPossibleInputs(data: NewPostInput) {
    if (!data.poll && data.attachments.length === 0 && !data.content) {
      throw new Error('Post must have content, attachments, or a poll');
    }

    if (data.poll) {
      this.checkPoll(data);
      if (data.attachments.length > 0) {
        throw new Error('Cannot have poll and attachments in the same post');
      }
    }

    this.checkAttachments(data);
  }

  private checkAttachments(data: NewPostInput) {
    if (data.attachments.length > 0) {
      if (data.poll) {
        throw new Error('Cannot have poll and attachments in the same post');
      }

      if (data.attachments.length > 4) {
        throw new Error('Cannot have more than 4 attachments');
      }

      const sortedAttachmentsOrder = data.attachments
        .map((a) => a.order)
        .sort((a, b) => a - b);

      for (let i = 0; i < sortedAttachmentsOrder.length; i++) {
        if (sortedAttachmentsOrder[i] !== i) {
          throw new Error('Attachments order must be sequential');
        }
      }
    }
  }

  private checkPoll(data: NewPostInput) {
    if (!data.poll) {
      return;
    }

    if (data.poll.options.length < 2) {
      throw new Error('Poll must have at least two options');
    }

    if (data.poll.options.length > 4) {
      throw new Error('Poll must have at most four options');
    }

    if (data.poll.start > data.poll.end) {
      throw new Error('Poll start must be before poll end');
    }

    if (data.poll.end < new Date()) {
      throw new Error('Poll end must be in the future');
    }

    if (data.poll.start < new Date()) {
      throw new Error('Poll start must be in the future');
    }
  }
}
