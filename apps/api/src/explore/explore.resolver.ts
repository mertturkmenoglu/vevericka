import { UseGuards } from "@nestjs/common";
import { Args, Resolver, Query } from "@nestjs/graphql";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { PaginationArgs } from "../common/args/pagination.args";
import { ExploreService } from "./explore.service";
import { Tag } from "./models/tag.model";

@Resolver(() => Tag)
export class ExploreResolver {
  constructor(private readonly exploreService: ExploreService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Tag])
  async tags(@Args() pagination: PaginationArgs): Promise<Tag[]> {
    const tags = await this.exploreService.getTags(pagination);
    return tags;
  }
}
