import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import {
  SpotifyStrategy,
  JwtStrategy,
  GitHubStrategy,
  TwitterStrategy,
  DiscordStrategy,
  GoogleStrategy,
} from "./strategies";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: "3600s",
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    DiscordStrategy,
    GitHubStrategy,
    GoogleStrategy,
    JwtStrategy,
    SpotifyStrategy,
    TwitterStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
