import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AxiomModule } from "../axiom/axiom.module";
import { PrismaModule } from "../prisma/prisma.module";
import { StoriesProcessor } from "./stories.processor";
import { StoriesResolver } from "./stories.resolver";
import { StoriesService } from "./stories.service";

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: "stories",
    }),
    AxiomModule,
  ],
  providers: [StoriesResolver, StoriesService, StoriesProcessor],
})
export class StoriesModule {}
