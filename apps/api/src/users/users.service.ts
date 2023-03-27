import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
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

  async findAll(): Promise<User[]> {
    const res = await this.prisma.user.findMany();
    return res;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
