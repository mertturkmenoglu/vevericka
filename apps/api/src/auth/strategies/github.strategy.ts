import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github";

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get("GITHUB_OAUTH_CLIENT_ID"),
      clientSecret: configService.get("GITHUB_OAUTH_CLIENT_SECRET"),
      callbackURL: configService.get("GITHUB_OAUTH_CALLBACK_URL"),
      scope: ["public_profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
