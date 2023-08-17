import { Module } from '@nestjs/common';
import { BookmarksResolver } from './bookmarks.resolver';
import { BookmarksService } from './bookmarks.service';
import { DbModule } from '@/db/db.module';
import { BookmarksRepository } from '@/bookmarks/bookmarks.repository';
import { PostsModule } from '@/posts/posts.module';

@Module({
  providers: [BookmarksResolver, BookmarksService, BookmarksRepository],
  imports: [DbModule, PostsModule],
})
export class BookmarksModule {}
