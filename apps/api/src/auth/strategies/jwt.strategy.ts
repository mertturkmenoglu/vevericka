import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@/auth';
import { Request } from 'express';
import { UsersRepository } from '@/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['jwt-access']?.split(' ')?.[1] ?? '';
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: process.env['NODE_ENV'] === 'development',
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: JwtPayload) {
    return await this.usersRepository.findOneUserById(payload.id);
  }
}
