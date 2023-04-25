import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { PostsService } from "./posts.service";

@Processor("posts")
export class PostsProcessor {
  constructor(private readonly postsService: PostsService) {}

  @Process("createPost")
  async createPost(job: Job) {
    const { dto, userId } = job.data;
    await this.postsService.create(userId, dto);
    return "done";
  }
}
