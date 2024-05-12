import Database from 'better-sqlite3';
import Debug from 'debug';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import express from 'express';

import drizzleRouter from './sqlite-drizzle.mjs';
import drizzleConfig from '../../drizzle/sqlite-drizzle.config.mjs';
import * as schema from '../schema.mjs';

const sqliteClient = new Database(drizzleConfig.dbCredentials.url);
const drizzleDB = drizzle(sqliteClient, { schema: schema });

const app = express();
const port = 3000;
const debug = Debug('fullstack-sandbox');

app.use((request, response, next) => {
  request.drizzle = drizzleDB;
  next();
});

app.get('/', (request, response) => {
  response.send("Hello World!");
});

app.use('/drizzle', drizzleRouter);

const server = app.listen(port, () => {
  debug("App running on debug mode...");
  console.log(`Example app listening on port ${ port }!`);
});

process.on('SIGTERM', () => {
  debug("SIGTERM received; closing express server...");
  server.close(async () => {
    sqliteClient.close();
    debug("Express server closed");
  });
});
