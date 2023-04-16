import { Injectable } from "@nestjs/common";
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

  async findProfileById(id: string): Promise<Profile> {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
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

    return result;
  }

  async findAll(): Promise<User[]> {
    const res = await this.prisma.user.findMany();
    return res;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
