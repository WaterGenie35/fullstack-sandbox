import 'dotenv/config';

/**
 * @typedef {import('drizzle-kit').Config} DrizzleConfig
*/
/** @type {DrizzleConfig} */
const drizzleConfig = {
  schema       : './src/schema.mjs',
  out          : './drizzle',
  driver       : 'better-sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
};

export default drizzleConfig;
