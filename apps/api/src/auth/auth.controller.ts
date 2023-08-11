/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Profile } from 'passport';
import { AuthService } from './auth.service';
import {
  DiscordGuard,
  GoogleGuard,
  JwtAuthGuard,
  SpotifyGuard,
} from './guards';

@Controller('oauth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie('jwt-access');
    return res.json({ message: 'Logged out' });
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleLogin() {}

  @Get('spotify')
  @UseGuards(SpotifyGuard)
  async spotifyLogin() {}

  @Get('discord')
  @UseGuards(DiscordGuard)
  async discordLogin() {}

  @Get('callback/google')
  @UseGuards(GoogleGuard)
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  @Get('callback/spotify')
  @UseGuards(SpotifyGuard)
  spotifyAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  @Get('callback/discord')
  @UseGuards(DiscordGuard)
  discordAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.addCookieAndRedirect(req, res);
  }

  private async addCookieAndRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const BASE = this.configService.get<string>('WEB_CLIENT_URL');
    const webClientRedirectUrl = `${BASE}/feed`;
    const user: Profile = req.user as Profile;
    const token = await this.authService.login(user);

    const isDevEnv = process.env['NODE_ENV'] === 'development';
    const cookieMaxAge = 1000 * 60 * 60 * 24 * 7;

    return res
      .cookie('jwt-access', token, {
        httpOnly: !isDevEnv,
        secure: !isDevEnv,
        maxAge: cookieMaxAge,
        path: '/',
      })
      .redirect(webClientRedirectUrl);
  }
}
