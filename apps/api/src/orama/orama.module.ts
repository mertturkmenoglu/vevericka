import { Module } from "@nestjs/common";
import { OramaService } from "./orama.service";

@Module({
  providers: [OramaService],
  exports: [OramaService],
})
export class OramaModule {}
