import {NotFoundException, UseGuards} from "@nestjs/common";
import {Args, Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";
import {PubSub} from "graphql-subscriptions";
import {JwtAuthGuard} from "../auth/guards";
import {CurrentUser} from "../common/types/current-user.type";
import {CurrentUser as CurrentUserDecorator} from "../common/decorators/current-user.decorator";
import {SearchService} from "../search/search.service";
import {UpdateUserInput} from "./dto/update-user.input";
import {LastSeen} from "./models/last-seen.model";
import {Profile} from "./models/profile.model";
import {User} from "./models/user.model";
import {UsersService} from "./users.service";

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly searchService: SearchService
  ) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUserDecorator() currentUser: CurrentUser): Promise<User> {
    return await this.usersService.findOneById(currentUser.user.id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args("id") id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => Profile)
  @UseGuards(JwtAuthGuard)
  async profile(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string
  ): Promise<Profile> {
    const profile = await this.usersService.findProfileById(
      currentUser.user.id,
      id
    );
    if (!profile) {
      throw new NotFoundException(id);
    }
    return profile;
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async interactWithUser(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("id") id: string,
    @Args("interaction") interaction: string
  ) {
    if (interaction === "follow") {
      await this.usersService.followUser(currentUser.user.id, id);
    } else if (interaction === "unfollow") {
      await this.usersService.unfollowUser(currentUser.user.id, id);
    }
    return "ok";
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUserDecorator() currentUser: CurrentUser,
    @Args("payload") payload: UpdateUserInput
  ): Promise<User> {
    const user = await this.usersService.update(currentUser.user.id, payload);

    await this.searchService.addUserToSearchIndex({
      name: user.name,
      id: user.id,
      description: user.description ?? "",
      protected: user.protected,
      verified: user.verified,
    });

    return user;
  }

  @Subscription(() => LastSeen)
  lastSeen() {
    return pubSub.asyncIterator("lastSeen");
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateLastSeen(@CurrentUserDecorator() currentUser: CurrentUser) {
    await pubSub.publish("lastSeen", {
      lastSeen: {
        id: currentUser.user.id,
        date: new Date().toISOString(),
      },
    });
    return "ok";
  }
}
