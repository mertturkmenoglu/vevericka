import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tag: varchar('tag', { length: 256 }).notNull().unique(),
  },
  (t) => {
    return {
      tagIdx: uniqueIndex('tag_idx').on(t.tag),
    };
  },
);
