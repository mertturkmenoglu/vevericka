import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from '@/auth';
import { CurrentUser, TCurrentUser } from '@/common';
import { LastSeen } from './models/last-seen.model';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Profile } from '@/users/models/profile.model';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() currentUser: TCurrentUser): Promise<User | null> {
    return await this.usersService.findOneById(currentUser.id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => Profile)
  @UseGuards(JwtAuthGuard)
  async profile(
    @Args('id') id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ): Promise<Profile> {
    const profile = await this.usersService.findOneProfileById(
      currentUser.id,
      id,
    );

    if (!profile) {
      throw new NotFoundException(id);
    }

    return profile;
  }

  @Subscription(() => LastSeen)
  lastSeen() {
    return pubSub.asyncIterator('lastSeen');
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateLastSeen(@CurrentUser() currentUser: TCurrentUser) {
    await pubSub.publish('lastSeen', {
      lastSeen: {
        id: currentUser.id,
        date: new Date().toISOString(),
      },
    });
    return 'ok';
  }
}
