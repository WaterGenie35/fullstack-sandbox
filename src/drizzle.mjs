import express from 'express';

import { users, posts } from './schema.mjs';
import { generatePost, generateUser } from './util.mjs';

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
  const [ userResult ] = await request.drizzle.insert(users).values(user).returning();
  console.log(userResult);
  await request.drizzle.insert(posts).values(generatePost(userResult));

  response.send(`Created new user: ${ user.username }, ${ user.email }`);
});

export default router;
