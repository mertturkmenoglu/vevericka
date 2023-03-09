import { NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
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
