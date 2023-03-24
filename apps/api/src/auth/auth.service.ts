import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "passport-spotify";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  login(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async findUserById(id: string) {
    return await this.prisma.auth.findUnique({
      where: {
        userId: 1,
      },
      select: {
        email: true,
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
