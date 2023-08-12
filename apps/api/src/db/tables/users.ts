import {
  boolean,
  date,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { auths } from '@/db/tables/auths';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  image: varchar('image', { length: 256 }).notNull().default('profile.png'),
  job: varchar('job', { length: 256 }),
  twitterHandle: varchar('twitter_handle', { length: 256 }),
  school: varchar('school', { length: 256 }),
  birthDate: date('birth_date'),
  website: varchar('website', { length: 256 }),
  description: varchar('description', { length: 256 }),
  verified: boolean('verified').default(false).notNull(),
  protected: boolean('protected').default(false).notNull(),
  banner: varchar('banner', { length: 256 }).notNull().default('banner.png'),
  gender: varchar('gender', { length: 256 }),
  location: varchar('location', { length: 256 }),
  authId: uuid('auth_id')
    .references(() => auths.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type TUser = InferModel<typeof users>;
