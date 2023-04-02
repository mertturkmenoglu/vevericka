import { Resolver, Query, Args } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { Results } from "./models/results.model";
import { UseGuards } from "@nestjs/common";
import { SearchService } from "./search.service";

@Resolver(() => Results)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => Results)
  @UseGuards(JwtAuthGuard)
  async searchPosts(@Args("term") term: string): Promise<Results> {
    return await this.searchService.searchPosts(term);
  }
}
