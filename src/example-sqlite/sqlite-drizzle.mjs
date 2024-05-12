import express from 'express';

import { userTable, postTable } from './sqlite-schema.mjs';
import { generatePost, generateUser } from '../util.mjs';

const router = express.Router();

router.get('/', (request, response, next) => {
  response.send("Drizzle");
});

router.get('/users', async (request, response, next) => {
  const users = await request.drizzle.query.userTable.findMany({
    with: {
      posts: true
    }
  });
  response.send(users);
});

router.post('/users', async (request, response, next) => {
  const user = generateUser();
  const [ userResult ] = await request.drizzle.insert(userTable).values(user).returning();
  await request.drizzle.insert(postTable).values(generatePost(userResult));

  response.send(`Created new user: ${ user.username }, ${ user.email }`);
});

export default router;
