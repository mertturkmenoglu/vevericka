import { Args, Query, Resolver } from "@nestjs/graphql";
import { LinkPreview } from "./models/link.model";
import { LinkService } from "./link.service";

@Resolver(() => LinkPreview)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Query(() => LinkPreview)
  async linkPreview(@Args("url") url: string): Promise<LinkPreview> {
    return this.linkService.getLinkPreview(url);
  }
}
