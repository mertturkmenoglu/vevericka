import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { PrismaModule } from "../prisma/prisma.module";
import { SearchProcessor } from "./search.processor";
import { SearchResolver } from "./search.resolver";
import { SearchService } from "./search.service";

@Module({
  imports: [
    ElasticsearchModule.register({
      node: "http://localhost:9200",
    }),
    BullModule.registerQueue({
      name: "searchIndices",
    }),
    PrismaModule,
  ],
  providers: [SearchResolver, SearchService, SearchProcessor],
})
export class SearchModule {}
