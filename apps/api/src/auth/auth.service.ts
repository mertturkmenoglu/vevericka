import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthProvider } from "@prisma/client";
import { Profile } from "passport";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "./types/jwt-payload.type";
import { OAuthType } from "./types/oauth.type";
import { Profile as DiscordProfile } from "passport-discord";
import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as GitHubProfile } from "passport-github";
import { Profile as SpotifyProfile } from "passport-spotify";
import { Profile as TwitterProfile } from "passport-twitter";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  private getUserInfoBasedOnProvider(user: Profile) {
    if (user.provider === "discord") {
      const u = user as DiscordProfile;
      return {
        sub: u.id,
        image: `profile.png`,
        type: u.provider as OAuthType,
        name: u.username,
      };
    }

    if (user.provider === "google") {
      const u = user as GoogleProfile;
      return {
        sub: u.id,
        image: u.photos[0].value,
        type: u.provider as OAuthType,
        name: u.displayName,
      };
    }

    if (user.provider === "github") {
      const u = user as GitHubProfile;
      return {
        sub: u.id,
        image: u.photos[0].value,
        type: u.provider as OAuthType,
        name: u.displayName,
      };
    }

    if (user.provider === "spotify") {
      const u = user as unknown as SpotifyProfile;
      return {
        sub: u.id,
        image: (u.photos[0] as any).value,
        type: u.provider as OAuthType,
        name: u.displayName,
      };
    }

    const u = user as TwitterProfile;
    return {
      sub: u.id,
      image: u.photos[0].value,
      type: u.provider as OAuthType,
      name: u.displayName,
    };
  }

  async login(user: Profile): Promise<string> {
    const { image, sub, name, ...info } = this.getUserInfoBasedOnProvider(user);
    const type = user.provider.toUpperCase() as AuthProvider;
    let userId: string;

    try {
      // User exist, signin user
      let authUser = await this.prisma.auth.findUniqueOrThrow({
        where: {
          sub_type: {
            sub,
            type,
          },
        },
      });
      userId = authUser.userId;
    } catch (e) {
      const user = await this.prisma.user.create({
        data: {
          name,
          image,
          auth: {
            connectOrCreate: {
              where: {
                sub_type: {
                  sub,
                  type,
                },
              },
              create: {
                sub,
                type,
              },
            },
          },
        },
      });

      userId = user.id;
    }

    const payload: JwtPayload = {
      sub,
      image,
      id: userId,
      name,
      type: info.type,
    };

    return `Bearer ${this.jwtService.sign(payload)}`;
  }

  async findUserById(id: string) {
    return await this.prisma.auth.findUnique({
      where: {
        userId: id,
      },
      select: {
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
