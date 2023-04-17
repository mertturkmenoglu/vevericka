import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./models/user.model";
import { Profile } from "./models/profile.model";

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

    const isFollowing = followingResult.following.length > 0;
    const isMe = thisId === otherId;

    return {
      ...result,
      isFollowing,
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
    const res = await this.prisma.user.findMany();
    return res;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
