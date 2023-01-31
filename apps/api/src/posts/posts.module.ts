import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  providers: [PostsResolver, PostsService],
  imports: [PrismaModule],
})
export class PostsModule {}
