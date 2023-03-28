import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards";
import { CurrentUser as CurrentUserDecorator } from "../common/decorators/current-user.decorator";
import { CurrentUser } from "src/common/types/current-user.type";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUserDecorator() currentUser: CurrentUser): Promise<User> {
    const user = await this.usersService.findOneById(`${currentUser.user.id}`);
    return user;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args("id") id: string): Promise<User> {
    const post = await this.usersService.findOneById(id);
    if (!post) {
      throw new NotFoundException(id);
    }
    return post;
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
