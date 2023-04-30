import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SearchModule } from "../search/search.module";
import { PostsProcessor } from "./posts.processor";
import { PostsRepository } from "./posts.repository";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  providers: [PostsResolver, PostsService, PostsProcessor, PostsRepository],
  imports: [
    PrismaModule,
    SearchModule,
    BullModule.registerQueue({
      name: "posts",
    }),
  ],
})
export class PostsModule {}
