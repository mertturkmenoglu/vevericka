import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { Profile as DiscordProfile } from 'passport-discord';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as SpotifyProfile } from 'passport-spotify';
import { EmailService } from '@/email/email.service';
import { SearchService } from '@/search/search.service';
import { JwtPayload, OAuthType } from '@/auth/types';
import { TAuth } from '@/db/tables';
import { AuthRepository } from '@/auth/auth.repository';
import { UsersRepository } from '@/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly usersRepository: UsersRepository,
    private readonly searchService: SearchService,
    private readonly emailService: EmailService,
  ) {}

  async login(user: Profile): Promise<string> {
    const { image, sub, name, ...info } = this.getUserInfoBasedOnProvider(user);
    const type = user.provider as TAuth['type'];
    let userId: string | null = null;
    const email = this.getEmailBasedOnType(type, user);
    const authRes = await this.authRepository.findAuthBySubAndType(sub, type);

    if (authRes) {
      const userRes = await this.usersRepository.findOneUserByAuthId(
        authRes.id,
      );
      if (userRes) {
        userId = userRes.id;
      }
    } else {
      const authResult = await this.authRepository.createAuth(sub, type);

      if (!authResult) {
        throw new Error('Cannot create auth');
      }

      const res = await this.usersRepository.createOneUser({
        name,
        email,
        image,
        authId: authResult.id,
      });

      if (!res) {
        throw new Error('Cannot create user');
      }

      await this.searchService.addUserToSearchIndex({
        id: res.id,
        name: res.name,
        verified: res.verified,
        protected: res.protected,
        description: res.description ?? '',
      });

      userId = res.id;
    }

    if (!userId) {
      throw new Error('Cannot get user id');
    }

    const payload: JwtPayload = {
      sub,
      image,
      id: userId,
      name,
      type: info.type,
      email,
    };

    await this.emailService.sendSigninNotificationEmail(email, name);

    return `Bearer ${this.jwtService.sign(payload)}`;
  }

  async findAuthById(id: string): Promise<TAuth | null> {
    return this.authRepository.findAuthById(id);
  }

  private getUserInfoBasedOnProvider(user: Profile) {
    if (user.provider === 'discord') {
      const u = user as DiscordProfile;
      return {
        sub: u.id,
        image: `profile.png`,
        type: u.provider as OAuthType,
        name: u.username,
      };
    }

    if (user.provider === 'google') {
      const u = user as GoogleProfile;
      return {
        sub: u.id,
        image: u.photos?.[0].value,
        type: u.provider as OAuthType,
        name: u.displayName,
      };
    }

    if (user.provider === 'spotify') {
      const u = user as unknown as SpotifyProfile;
      return {
        sub: u.id,
        image: (u.photos?.[0] as any).value,
        type: u.provider as OAuthType,
        name: u.displayName,
      };
    }

    throw new Error('Cannot get info based on provider');
  }

  private getEmailBasedOnType(type: TAuth['type'], user: Profile): string {
    let email: string;

    switch (type) {
      case 'discord': {
        email = (user as any).email;
        break;
      }
      case 'google': {
        email = (user as any).emails[0].value;
        break;
      }
      case 'spotify': {
        email = (user as any).emails[0].value;
        break;
      }
      default: {
        throw new Error('Invalid OAuth type');
      }
    }

    return email;
  }
}
