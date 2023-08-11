import { Module } from "@nestjs/common";
import { LinkResolver } from "./link.resolver";
import { LinkService } from "./link.service";

@Module({
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
