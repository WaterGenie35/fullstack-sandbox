import express from 'express';

import { generateUser } from './util.mjs';

const router = express.Router();

router.get('/', (request, response, next) => {
  response.send("Prisma");
});

router.get('/users', async (request, response, next) => {
  const users = await request.prisma.user.findMany({
    include: {
      posts: true
    }
  });
  response.send(users);
});

// TODO: look into typing the extended request
router.post('/users', async (request, response, next) => {
  const user = generateUser();
  await request.prisma.user.create({ data: user });

  response.send(`Created new user: ${ user.username }, ${ user.email }`);
});

export default router;
