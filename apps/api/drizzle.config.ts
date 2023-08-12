import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/tables/*',
  out: './src/db/drizzle',
} satisfies Config;
