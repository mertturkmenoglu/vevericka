import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { OramaModule } from "../orama/orama.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PostsProcessor } from "./posts.processor";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  providers: [PostsResolver, PostsService, PostsProcessor],
  imports: [
    PrismaModule,
    OramaModule,
    BullModule.registerQueue({
      name: "posts",
    }),
  ],
})
export class PostsModule {}
