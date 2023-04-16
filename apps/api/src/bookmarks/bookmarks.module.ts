import { Module } from "@nestjs/common";
import { BookmarksResolver } from "./bookmarks.resolver";
import { BookmarksService } from "./bookmarks.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [BookmarksResolver, BookmarksService],
  imports: [PrismaModule],
})
export class BookmarksModule {}
