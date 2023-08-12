import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { DbModule } from '@/db/db.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [DbModule],
})
export class UsersModule {}
