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
    host    : process.env.POSTGRES_HOST,
    port    : process.env.POSTGRES_PORT,
    user    : process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PW,
    database: process.env.POSTGRES_DB
  }
};

export default drizzleConfig;
