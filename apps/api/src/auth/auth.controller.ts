import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import {
  SpotifyGuard,
  GitHubGuard,
  TwitterGuard,
  GoogleGuard,
  DiscordGuard,
} from "./guards";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

@Controller("oauth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Get("google")
  @UseGuards(GoogleGuard)
  async googleLogin() {
    console.log("google login called");
    return "google ok";
  }

  @Get("github")
  @UseGuards(GitHubGuard)
  async githubLogin() {
    console.log("github login called");
    return "github ok";
  }

  @Get("twitter")
  @UseGuards(TwitterGuard)
  async twitterLogin() {
    console.log("twitter login called");
    return "twitter ok";
  }

  @Get("spotify")
  @UseGuards(SpotifyGuard)
  async spotifyLogin() {
    console.log("spotify login called");
    return "spotify ok";
  }

  @Get("discord")
  @UseGuards(DiscordGuard)
  async discordLogin() {
    console.log("discord login called");
    return "discord ok";
  }

  @Get("callback/google")
  @UseGuards(GoogleGuard)
  googleAuthCallback(@Req() req: any) {
    const user = req.user;
    console.log(user);
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
  }

  @Get("callback/github")
  @UseGuards(GitHubGuard)
  githubAuthCallback(@Req() req: any) {
    const user = req.user;
    console.log(user);
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
  }

  @Get("callback/twitter")
  @UseGuards(TwitterGuard)
  twitterAuthCallback(@Req() req: any) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
  }

  @Get("callback/spotify")
  @UseGuards(SpotifyGuard)
  spotifyAuthCallback(@Req() req: any) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
  }

  @Get("callback/discord")
  @UseGuards(DiscordGuard)
  discordAuthCallback(@Req() req: any) {
    const user = req.user;
    const payload = { sub: user.id, username: user.username };
    return { accessToken: this.jwtService.sign(payload) };
  }

  // @UseGuards(SpotifyOauthGuard)
  // @Get("redirect")
  // async spotifyAuthRedirect(
  //   @Req() req: any,
  //   @Res() res: Response
  // ): Promise<Response> {
  //   const {
  //     user,
  //     authInfo,
  //   }: {
  //     user: Profile;
  //     authInfo: {
  //       accessToken: string;
  //       refreshToken: string;
  //       expires_in: number;
  //     };
  //   } = req;

  //   if (!user) {
  //     res.redirect("/");
  //     return;
  //   }

  //   req.user = undefined;

  //   const jwt = this.authService.login(user);

  //   res.set("authorization", `Bearer ${jwt}`);

  //   return res.status(201).json({ authInfo, user });
  // }
}
