import { Injectable } from '@nestjs/common';
import { DbService } from '@/db/db.service';
import { auths, TAuth } from '@/db/tables';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class AuthRepository {
  constructor(private readonly db: DbService) {}

  async findAuthById(id: string): Promise<TAuth | null> {
    const res = await this.db.client
      .select()
      .from(auths)
      .where(eq(auths.id, id))
      .limit(1);

    if (res.length > 0) {
      return res[0];
    }

    return null;
  }

  async findAuthBySubAndType(
    sub: string,
    type: TAuth['type'],
  ): Promise<TAuth | null> {
    const res = await this.db.client
      .select()
      .from(auths)
      .where(and(eq(auths.sub, sub), eq(auths.type, type)))
      .limit(1);

    if (res.length > 0) {
      return res[0];
    }

    return null;
  }

  async createAuth(sub: string, type: TAuth['type']): Promise<TAuth | null> {
    const res = await this.db.client
      .insert(auths)
      .values({
        sub,
        type,
      })
      .returning();

    if (res.length > 0) {
      return res[0];
    }

    return null;
  }
}
