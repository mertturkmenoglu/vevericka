import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Profile } from "passport";
import {
  SpotifyGuard,
  GitHubGuard,
  TwitterGuard,
  GoogleGuard,
  DiscordGuard,
  JwtAuthGuard,
} from "./guards";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("oauth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    // TODO: Fix cookie remove bug
    return res
      .cookie("jwt-access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1,
        path: "/",
      })
      .redirect(this.configService.get<string>("WEB_CLIENT_URL"));
  }

  @Get("google")
  @UseGuards(GoogleGuard)
  async googleLogin() {}

  @Get("github")
  @UseGuards(GitHubGuard)
  async githubLogin() {}

  @Get("twitter")
  @UseGuards(TwitterGuard)
  async twitterLogin() {}

  @Get("spotify")
  @UseGuards(SpotifyGuard)
  async spotifyLogin() {}

  @Get("discord")
  @UseGuards(DiscordGuard)
  async discordLogin() {}

  @Get("callback/google")
  @UseGuards(GoogleGuard)
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  @Get("callback/github")
  @UseGuards(GitHubGuard)
  githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  @Get("callback/twitter")
  @UseGuards(TwitterGuard)
  twitterAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  @Get("callback/spotify")
  @UseGuards(SpotifyGuard)
  spotifyAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  @Get("callback/discord")
  @UseGuards(DiscordGuard)
  discordAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  private addCookieAndRedirect(@Req() req: Request, @Res() res: Response) {
    const BASE = this.configService.get<string>("WEB_CLIENT_URL");
    const webClientRedirectUrl = `${BASE}/feed`;
    const user: Profile = req.user as Profile;
    const token = this.authService.login(user);
    return res
      .cookie("jwt-access", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
      })
      .redirect(webClientRedirectUrl);
  }
}
