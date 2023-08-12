import { Injectable, OnModuleInit } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

@Injectable()
export class DbService implements OnModuleInit {
  public client!: ReturnType<typeof drizzle>;
  private readonly connectionString!: string;
  private readonly postgresClient!: postgres.Sql;

  constructor() {
    this.connectionString = process.env['DATABASE_URL'] ?? '';
    this.postgresClient = postgres(this.connectionString);
    this.client = drizzle(this.postgresClient);
  }

  async migrateDb() {
    const sql = postgres(this.connectionString, { max: 1 });
    const migrationConnection = drizzle(sql);
    await migrate(migrationConnection, { migrationsFolder: 'src/db/drizzle' });
  }

  async onModuleInit() {
    await this.migrateDb();
  }
}
