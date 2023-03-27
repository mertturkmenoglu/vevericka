import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Profile } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "./types/jwt-payload.type";
import { OAuthType } from "./types/oauth.type";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  login(user: Profile): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.emails[0].value,
      image: user.photos[0].value,
      type: user.provider as OAuthType,
    };

    return `Bearer ${this.jwtService.sign(payload)}`;
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
