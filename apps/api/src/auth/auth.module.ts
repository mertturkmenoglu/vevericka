import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { EmailModule } from "../email/email.module";
import { SearchModule } from "../search/search.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {
  DiscordStrategy,
  GoogleStrategy,
  JwtStrategy,
  SpotifyStrategy,
} from "./strategies";

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    SearchModule,
    EmailModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          verifyOptions: {
            ignoreExpiration: process.env.NODE_ENV === "development",
          },
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
    GoogleStrategy,
    JwtStrategy,
    SpotifyStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
