import { Module } from '@nestjs/common';
import { ExploreResolver } from './explore.resolver';
import { ExploreService } from './explore.service';
import { DbModule } from '@/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ExploreResolver, ExploreService],
})
export class ExploreModule {}
