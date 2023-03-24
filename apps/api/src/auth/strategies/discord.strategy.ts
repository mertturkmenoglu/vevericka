import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-discord";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, "discord") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get("DISCORD_OAUTH_CLIENT_ID"),
      clientSecret: configService.get("DISCORD_OAUTH_CLIENT_SECRET"),
      callbackURL: configService.get("DISCORD_OAUTH_CALLBACK_URL"),
      scope: ["identify", "email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
