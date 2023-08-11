import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { PrismaService } from "../prisma/prisma.service";
import { StoriesService } from "./stories.service";

@Processor("stories")
export class StoriesProcessor {
  private readonly logger = new Logger(StoriesProcessor.name);

  constructor(
    private readonly storiesService: StoriesService,
    private readonly prisma: PrismaService
  ) {}

  @OnQueueCompleted()
  async onQueueCompleted(job: Job) {
    this.logger.log(`Job ${job.name} completed at ${new Date().toISOString()}`);
  }

  @Process("deleteStories")
  async deleteStories(job: Job<{ ids: string[] }>) {
    const { ids } = job.data;

    const totalCount = ids.length;
    const batchSize = 100;

    for (let i = 0; i < totalCount; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      await this.prisma.story.deleteMany({
        where: {
          id: {
            in: batch,
          },
        },
      });
      await job.progress((i + batchSize) / totalCount);
    }
    return "done";
  }
}
