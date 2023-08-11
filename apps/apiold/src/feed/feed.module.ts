import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { FeedResolver } from "./feed.resolver";
import { FeedService } from "./feed.service";

@Module({
  providers: [FeedResolver, FeedService],
  imports: [PrismaModule],
})
export class FeedModule {}
