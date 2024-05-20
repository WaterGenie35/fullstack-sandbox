import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import drizzleConfig from "./postgresql-drizzle.config.mjs";
import * as schema from '../src/example-sqlite/sqlite-schema.mjs';

console.log(`Migration folder:\t${ drizzleConfig.out }`);

const credentials = { ...drizzleConfig.dbCredentials };
delete credentials.password;
console.log(`Using postgresql db:\t${ JSON.stringify(credentials) }`);

const postgresqlClient = postgres(drizzleConfig.dbCredentials);
const drizzleDB = drizzle(postgresqlClient, { schema: schema });

await migrate(drizzleDB, { migrationsFolder: drizzleConfig.out });

await postgresqlClient.end();

console.log("Finished migrating");
