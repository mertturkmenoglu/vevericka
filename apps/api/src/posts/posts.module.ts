import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AxiomModule } from '@/axiom/axiom.module';
import { SearchModule } from '@/search/search.module';
import { PostsProcessor } from './posts.processor';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { DbModule } from '@/db/db.module';

@Module({
  providers: [PostsResolver, PostsService, PostsProcessor, PostsRepository],
  imports: [
    DbModule,
    SearchModule,
    BullModule.registerQueue({
      name: 'posts',
    }),
    AxiomModule,
  ],
})
export class PostsModule {}
