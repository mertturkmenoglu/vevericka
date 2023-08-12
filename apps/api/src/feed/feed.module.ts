import { Module } from '@nestjs/common';
import { FeedResolver } from './feed.resolver';
import { FeedService } from './feed.service';
import { DbModule } from '@/db/db.module';

@Module({
  providers: [FeedResolver, FeedService],
  imports: [DbModule],
})
export class FeedModule {}
