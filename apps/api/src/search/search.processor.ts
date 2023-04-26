import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Job } from "bull";
import { PrismaService } from "../prisma/prisma.service";

@Processor("searchIndices")
export class SearchProcessor {
  private readonly logger = new Logger(SearchProcessor.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  @OnQueueCompleted()
  async onQueueCompleted(job: Job) {
    this.logger.log(`Job ${job.name} completed at ${new Date().toISOString()}`);
  }

  @Process("updateSearchIndices")
  async updateSearchIndices(job: Job) {
    let flag = true;
    let skip = 0;
    let take = 100;
    let i = 0;

    const totalUsers = await this.prisma.user.count();
    const totalPosts = await this.prisma.post.count();
    const total = totalUsers + totalPosts;

    while (flag) {
      const users = await this.prisma.user.findMany({
        where: {
          protected: false,
        },
        select: {
          id: true,
          name: true,
          description: true,
          verified: true,
          protected: true,
        },
        skip,
        take,
      });

      if (users.length === 0) {
        flag = false;
        break;
      }

      for (const user of users) {
        await this.elasticsearchService.index({
          index: "users",
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
      const posts = await this.prisma.post.findMany({
        select: {
          id: true,
          content: true,
          userId: true,
        },
        skip,
        take,
      });

      if (posts.length === 0) {
        flag = false;
        break;
      }

      for (const post of posts) {
        await this.elasticsearchService.index({
          index: "posts",
          document: {
            ...post,
          },
        });
      }

      skip += take;
      i++;
      await job.progress(((i + totalUsers) / total) * 100);
    }

    return "done";
  }
}
