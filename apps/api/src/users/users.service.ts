import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { TUser, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

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

  async findAll(): Promise<TUser[]> {
    return this.db.client.select().from(users);
  }
}
