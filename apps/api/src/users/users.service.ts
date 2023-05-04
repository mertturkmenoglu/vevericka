import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateUserInput } from "./dto/update-user.input";
import { Profile } from "./models/profile.model";
import { User } from "./models/user.model";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findProfileById(thisId, otherId: string): Promise<Profile> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: otherId,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    const followingResult = await this.prisma.user.findUnique({
      where: {
        id: thisId,
      },
      include: {
        following: {
          where: {
            id: otherId,
          },
        },
      },
    });

    const pendingFollowRequest = await this.prisma.followRequest.findFirst({
      where: {
        fromId: thisId,
        toId: otherId,
      },
    });

    const isFollowing = followingResult.following.length > 0;
    const hasPendingFollowRequest = !!pendingFollowRequest;
    const isMe = thisId === otherId;

    return {
      ...result,
      isFollowing,
      hasPendingFollowRequest,
      isMe,
    };
  }

  async followUser(followerId: string, followeeId: string): Promise<void> {
    const followingCheckCount = await this.prisma.user.count({
      where: {
        id: followerId,
        following: {
          some: {
            id: followeeId,
          },
        },
      },
    });

    const isAlreadyFollowing = followingCheckCount > 0;

    if (isAlreadyFollowing) {
      throw new BadRequestException("Already following");
    }

    const followee = await this.prisma.user.findUnique({
      where: {
        id: followeeId,
      },
    });

    if (!followee) {
      throw new BadRequestException("User not found");
    }

    if (!followee.protected) {
      await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: followerId,
          },
          data: {
            following: {
              connect: {
                id: followeeId,
              },
            },
          },
        }),
        this.prisma.user.update({
          where: {
            id: followeeId,
          },
          data: {
            followers: {
              connect: {
                id: followerId,
              },
            },
          },
        }),
      ]);

      return;
    }

    const existingRequest = await this.prisma.followRequest.findFirst({
      where: {
        fromId: followerId,
        toId: followeeId,
      },
    });

    if (existingRequest) {
      throw new BadRequestException("Request already sent");
    }

    await this.prisma.followRequest.create({
      data: {
        from: {
          connect: {
            id: followerId,
          },
        },
        to: {
          connect: {
            id: followeeId,
          },
        },
      },
    });

    return;
  }

  async unfollowUser(followerId: string, followeeId: string): Promise<void> {
    const followingCheckCount = await this.prisma.user.count({
      where: {
        id: followerId,
        following: {
          some: {
            id: followeeId,
          },
        },
      },
    });

    const isNotFollowing = followingCheckCount === 0;

    if (isNotFollowing) {
      throw new BadRequestException("Not following");
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: followerId,
        },
        data: {
          following: {
            disconnect: {
              id: followeeId,
            },
          },
        },
      }),
      this.prisma.user.update({
        where: {
          id: followeeId,
        },
        data: {
          followers: {
            disconnect: {
              id: followerId,
            },
          },
        },
      }),
    ]);
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: string, payload: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...payload,
      },
    });
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
