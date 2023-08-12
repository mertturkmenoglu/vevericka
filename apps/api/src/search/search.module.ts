import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchProcessor } from './search.processor';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { DbModule } from '@/db/db.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
    BullModule.registerQueue({
      name: 'searchIndices',
    }),
    DbModule,
  ],
  providers: [SearchResolver, SearchService, SearchProcessor],
  exports: [SearchService],
})
export class SearchModule {}
