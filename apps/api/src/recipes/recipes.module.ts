import { Module } from "@nestjs/common";
import { DateScalar } from "../common/scalars/date.scalar";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  providers: [RecipesResolver, RecipesService, DateScalar],
  imports: [PrismaModule],
})
export class RecipesModule {}
