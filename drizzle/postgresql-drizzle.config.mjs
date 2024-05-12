import 'dotenv/config';

/**
 * @typedef {import('drizzle-kit').Config} DrizzleConfig
*/
/** @type {DrizzleConfig} */
const drizzleConfig = {
  dialect      : 'postgresql',
  schema       : './src/schema.mjs',
  out          : './drizzle',
  driver       : 'pg',
  dbCredentials: {
    host    : process.env.DATABASE_HOST,
    port    : process.env.DATABASE_PORT,
    user    : process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
};

export default drizzleConfig;
