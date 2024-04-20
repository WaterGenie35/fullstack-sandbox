import express from 'express';

import { users } from './schema.mjs';
import { generateUser } from './util.mjs';

const router = express.Router();

router.get('/', (request, response, next) => {
  response.send("Drizzle");
});

router.get('/users', async (request, response, next) => {
  const users = await request.drizzle.query.users.findMany({
    with: {
      posts: true
    }
  });
  response.send(users);
});

router.post('/users', async (request, response, next) => {
  const user = generateUser();
  await request.drizzle.insert(users).values(user);
  // TODO: see following through with relations like in prisma

  response.send(`Created new user: ${ user.username }, ${ user.email }`);
});

export default router;
