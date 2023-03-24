import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get("GOOGLE_OAUTH_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_OAUTH_CLIENT_SECRET"),
      callbackURL: configService.get("GOOGLE_OAUTH_CALLBACK_URL"),
      scope: ["profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
