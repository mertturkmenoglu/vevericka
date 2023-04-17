import { Module } from "@nestjs/common";
import { SearchResolver } from "./search.resolver";
import { SearchService } from "./search.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [SearchResolver, SearchService],
  imports: [PrismaModule],
})
export class SearchModule {}
