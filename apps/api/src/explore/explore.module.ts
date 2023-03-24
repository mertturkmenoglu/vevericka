import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ExploreResolver } from "./explore.resolver";
import { ExploreService } from "./explore.service";

@Module({
  imports: [PrismaModule],
  providers: [ExploreResolver, ExploreService],
})
export class ExploreModule {}
