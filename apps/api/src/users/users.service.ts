import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { TUser, users } from '@/db';
import { eq } from 'drizzle-orm';
import { Profile } from '@/users/models/profile.model';
import { UsersRepository } from '@/users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DbService,
    private readonly repository: UsersRepository,
  ) {}

  async findOneById(id: string): Promise<TUser | null> {
    const results = await this.db.client
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    return results[0];
  }

  async findOneProfileById(
    thisUserId: string,
    id: string,
  ): Promise<Profile | null> {
    return await this.repository.findOneProfileById(thisUserId, id);
  }

  async findAll(): Promise<TUser[]> {
    return this.db.client.select().from(users);
  }
}
