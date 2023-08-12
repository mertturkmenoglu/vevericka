import { Module } from "@nestjs/common";
import { BookmarksResolver } from "./bookmarks.resolver";
import { BookmarksService } from "./bookmarks.service";
import { DbModule } from "@/db/db.module";

@Module({
  providers: [BookmarksResolver, BookmarksService],
  imports: [DbModule],
})
export class BookmarksModule {}
