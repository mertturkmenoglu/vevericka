import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Job } from 'bull';
import { DbService } from '@/db/db.service';
import { posts, users } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

@Processor('searchIndices')
export class SearchProcessor {
  private readonly logger = new Logger(SearchProcessor.name);
  constructor(
    private readonly db: DbService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @OnQueueCompleted()
  async onQueueCompleted(job: Job) {
    this.logger.log(`Job ${job.name} completed at ${new Date().toISOString()}`);
  }

  @Process('updateSearchIndices')
  async updateSearchIndices(job: Job) {
    let flag = true;
    let skip = 0;
    let take = 100;
    let i = 0;

    const usersResults = await this.db.client
      .select({ count: sql<number>`count(*)` })
      .from(users);

    const postsResults = await this.db.client
      .select({ count: sql<number>`count(*)` })
      .from(posts);

    const totalUsers = usersResults[0].count;
    const totalPosts = postsResults[0].count;
    const total = totalUsers + totalPosts;

    while (flag) {
      const usersResults = await this.db.client
        .select({
          id: users.id,
          name: users.name,
          description: users.description,
          verified: users.verified,
          protected: users.protected,
        })
        .from(users)
        .where(eq(users.protected, false))
        .limit(take)
        .offset(skip);

      if (usersResults.length === 0) {
        flag = false;
        break;
      }

      for (const user of usersResults) {
        await this.elasticsearchService.index({
          index: 'users',
          document: {
            ...user,
          },
        });
      }

      skip += take;
      i++;
      await job.progress((i / total) * 100);
    }

    flag = true;
    skip = 0;
    take = 100;
    i = 0;

    while (flag) {
      const postsResults = await this.db.client
        .select({
          id: posts.id,
          content: posts.content,
          userId: posts.userId,
        })
        .from(posts)
        .limit(take)
        .offset(skip);

      if (postsResults.length === 0) {
        flag = false;
        break;
      }

      for (const post of postsResults) {
        await this.elasticsearchService.index({
          index: 'posts',
          document: {
            ...post,
          },
        });
      }

      skip += take;
      i++;
      await job.progress(((i + totalUsers) / total) * 100);
    }

    return 'done';
  }
}
