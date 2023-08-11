import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { SearchModule } from "../search/search.module";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersResolver, UsersService],
  imports: [PrismaModule, SearchModule],
})
export class UsersModule {}
