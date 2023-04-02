import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";
import { OramaModule } from "../orama/orama.module";

@Module({
  providers: [PostsResolver, PostsService],
  imports: [PrismaModule, OramaModule],
})
export class PostsModule {}
