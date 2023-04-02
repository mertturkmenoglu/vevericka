import { Module } from "@nestjs/common";
import { SearchResolver } from "./search.resolver";
import { OramaModule } from "../orama/orama.module";
import { SearchService } from "./search.service";

@Module({
  providers: [SearchResolver, SearchService],
  imports: [OramaModule],
})
export class SearchModule {}
