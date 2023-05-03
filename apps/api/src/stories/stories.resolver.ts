import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "../auth/guards";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "../common/types/current-user.type";
import { CreateStoryInput } from "./dto/create-story.input";
import { StoryFeedElement } from "./models/story-feed-element";
import { Story } from "./models/story.model";
import { StoriesService } from "./stories.service";

@Resolver(() => Story)
export class StoriesResolver {
  constructor(private readonly storiesService: StoriesService) {}

  @Query(() => Story)
  @UseGuards(JwtAuthGuard)
  async story(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
  ) {
    return this.storiesService.findOneById(currentUser.user.id, id);
  }

  @Query(() => [Story])
  @UseGuards(JwtAuthGuard)
  async stories(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
  ) {
    return this.storiesService.getStoriesByUserId(currentUser.user.id, id);
  }

  @Query(() => [StoryFeedElement])
  @UseGuards(JwtAuthGuard)
  async storyFeed(@CurrentUserDecorator() currentUser: CurrentUser) {
    return this.storiesService.getStoryFeedByUserId(currentUser.user.id);
  }

  @Mutation(() => Story)
  @UseGuards(JwtAuthGuard)
  async createStory(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("payload") payload: CreateStoryInput
  ) {
    return this.storiesService.createStory(currentUser.user.id, payload);
  }

  @Mutation(() => Story)
  @UseGuards(JwtAuthGuard)
  async deleteStory(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
  ) {
    return this.storiesService.deleteStory(currentUser.user.id, id);
  }

  @Mutation(() => Story)
  @UseGuards(JwtAuthGuard)
  async markStoryAsSeen(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
  ) {
    return this.storiesService.markStoryAsSeen(currentUser.user.id, id);
  }
}
