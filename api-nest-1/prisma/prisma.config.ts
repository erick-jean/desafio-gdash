import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// export default defineConfig({
//   schema: 'prisma/schema.prisma',
//   // migrations: { path: 'prisma/migrations' }, // opcional para mongo (migrations têm limitações)
//   datasources: {
//     db: {
//       url: env('DATABASE_URL'),
//     },
//   },
// });