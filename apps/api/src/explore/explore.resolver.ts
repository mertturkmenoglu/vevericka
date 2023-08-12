import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@/auth';
import { PaginationArgs } from '@/common';
import { ExploreService } from './explore.service';
import { PopularTag, Tag } from './models/tag.model';

@Resolver(() => Tag)
export class ExploreResolver {
  constructor(private readonly exploreService: ExploreService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Tag])
  async tags(@Args() pagination: PaginationArgs): Promise<Tag[]> {
    return this.exploreService.getTags(pagination);
  }

  @Query(() => [PopularTag])
  @UseGuards(JwtAuthGuard)
  async popularTags(@Args() pagination: PaginationArgs): Promise<PopularTag[]> {
    return this.exploreService.getPopularTags(pagination);
  }
}
