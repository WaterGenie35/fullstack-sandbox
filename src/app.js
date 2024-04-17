import { PrismaClient } from '@prisma/client';
import compression from 'compression';
import Debug from 'debug';
import express from 'express';
import helmet from 'helmet';

import prismaRouter from './prisma.mjs';

const prisma = new PrismaClient();
const app = express();
const port = 3000;
const debug = Debug('fullstack-sandbox');

// Security practices
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());
app.disable('x-powered-by');

// Performance and reliability practices
// Remove compression middleware when we have it at the reverse proxy level
app.use(compression());

app.use((request, response, next) => {
  request.prisma = prisma;
  next();
});

app.get('/', (request, response) => {
  response.send("Hello World!");
});

app.use('/prisma', prismaRouter);

// Deviate from express' default error responses (part of security practice)
app.use((request, response, next) => {
  response.status(404).send("Error: Not found");
});
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status || 500).send("Error: Something went wrong");
});

const server = app.listen(port, () => {
  debug("App running on debug mode...");
  console.log(`Example app listening on port ${ port }!`);
});

// Express' graceful shutdown
process.on('SIGTERM', () => {
  debug("SIGTERM received; closing express server...");
  server.close(async () => {
    await prisma.$disconnect();
    debug("Express server closed");
  });
});
