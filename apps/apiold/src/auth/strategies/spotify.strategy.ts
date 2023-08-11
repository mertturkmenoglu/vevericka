import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-spotify";

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, "spotify") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get("SPOTIFY_OAUTH_CLIENT_ID"),
      clientSecret: configService.get("SPOTIFY_OAUTH_CLIENT_SECRET"),
      callbackURL: configService.get("SPOTIFY_OAUTH_CALLBACK_URL"),
      scope: ["user-read-private user-read-email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
