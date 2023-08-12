import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const authProvidersEnum = pgEnum('auth_providers', [
  'discord',
  'google',
  'spotify',
]);

export const auths = pgTable('auths', {
  id: uuid('id').primaryKey().defaultRandom(),
  sub: varchar('sub', { length: 256 }).notNull(),
  type: authProvidersEnum('type').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TAuth = InferModel<typeof auths>;
