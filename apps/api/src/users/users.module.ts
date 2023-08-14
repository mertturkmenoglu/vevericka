import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DbModule } from '@/db/db.module';
import { UsersRepository } from '@/users/users.repository';

@Module({
  providers: [UsersResolver, UsersService, UsersRepository],
  imports: [DbModule],
})
export class UsersModule {}
