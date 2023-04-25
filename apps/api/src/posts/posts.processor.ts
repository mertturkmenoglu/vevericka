import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { PostsService } from "./posts.service";

@Processor("posts")
export class PostsProcessor {
  private readonly logger = new Logger(PostsProcessor.name);

  constructor(private readonly postsService: PostsService) {}

  @OnQueueCompleted()
  async onQueueCompleted(job: Job) {
    this.logger.log(`Job ${job.name} completed at ${new Date().toISOString()}`);
  }

  @OnQueueError()
  async onQueueError(job: Job, error: Error) {
    this.logger.error(`Job ${job.name} failed with error: ${error.message}`);
  }

  @Process("createPost")
  async createPost(job: Job) {
    const { dtos, userId } = job.data;
    let i = 1;
    for (const dto of dtos) {
      await this.postsService.create(userId, dto);
      await job.progress((i / dtos.length) * 100);
      i++;
    }
    return "done";
  }
}
