import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-twitter";

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, "twitter") {
  constructor(configService: ConfigService) {
    super({
      consumerKey: configService.get("TWITTER_OAUTH_CLIENT_ID"),
      consumerSecret: configService.get("TWITTER_OAUTH_CLIENT_SECRET"),
      callbackURL: configService.get("TWITTER_OAUTH_CALLBACK_URL"),
      scope: ["users.read"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
