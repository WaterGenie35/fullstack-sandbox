import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import drizzleConfig from "../drizzle.config.mjs";
import * as schema from '../src/schema.mjs';

console.log(`Using sqlite db:\t${ drizzleConfig.dbCredentials.url }`);
console.log(`Migration folder:\t${ drizzleConfig.out }`);

const sqliteClient = new Database(drizzleConfig.dbCredentials.url);
const drizzleDB = drizzle(sqliteClient, { schema: schema });

migrate(drizzleDB, { migrationsFolder: drizzleConfig.out });

sqliteClient.close();

console.log("Finished migrating");
