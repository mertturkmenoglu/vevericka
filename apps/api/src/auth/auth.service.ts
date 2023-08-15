import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { Profile as DiscordProfile } from 'passport-discord';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as SpotifyProfile } from 'passport-spotify';
import { EmailService } from '@/email/email.service';
import { SearchService } from '@/search/search.service';
import { JwtPayload, OAuthType } from '@/auth/types';
import { DbService } from '@/db/db.service';
import { auths, TAuth, TNewUser, users } from '@/db/tables';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: DbService,
    private readonly searchService: SearchService,
    private readonly emailService: EmailService,
  ) {}

  async login(user: Profile): Promise<string> {
    const { image, sub, name, ...info } = this.getUserInfoBasedOnProvider(user);
    const type = user.provider as TAuth['type'];
    let userId: string;

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

    const res = await this.db.client
      .select()
      .from(auths)
      .where(and(eq(auths.sub, sub), eq(auths.type, type)))
      .limit(1);

    if (res.length > 0) {
      const authId = res[0].id;
      const userResult = await this.db.client
        .select()
        .from(users)
        .where(eq(users.authId, authId))
        .limit(1);

      userId = userResult[0].id;
    } else {
      const createAuthResult = await this.db.client
        .insert(auths)
        .values({
          sub,
          type,
        })
        .returning();

      const authId = createAuthResult[0].id;

      const data: TNewUser = {
        name,
        email,
        image,
        job: null,
        twitterHandle: null,
        school: null,
        birthDate: null,
        website: null,
        description: null,
        gender: null,
        location: null,
        pinnedPostId: null,
        authId,
        verified: false,
        protected: false,
        banner: 'banner.png',
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
      };

      const createUserResult = await this.db.client
        .insert(users)
        .values(data)
        .returning();

      const user = createUserResult[0];

      await this.searchService.addUserToSearchIndex({
        id: user.id,
        name: user.name,
        verified: user.verified,
        protected: user.protected,
        description: user.description ?? '',
      });

      userId = user.id;
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

  async findAuthById(id: string) {
    return this.db.client.select().from(auths).where(eq(auths.id, id));
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
}
