import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { PubSub } from "graphql-subscriptions";
import { LastSeen } from "./models/last-seen.model";
import { Profile } from "./models/profile.model";
import { Interaction } from "./dto/interact.input";

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUserDecorator() currentUser: CurrentUser): Promise<User> {
    const user = await this.usersService.findOneById(currentUser.user.id);
    return user;
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
  async profile(@Args("id") id: string): Promise<Profile> {
    const profile = await this.usersService.findProfileById(id);
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
    @Args("interaction") interaction: Interaction
  ) {
    if (interaction === "follow") {
      await this.usersService.followUser(currentUser.user.id, id);
    } else if (interaction === "unfollow") {
      await this.usersService.unfollowUser(currentUser.user.id, id);
    }
    return "ok";
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
