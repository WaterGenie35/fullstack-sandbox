import { faker } from '@faker-js/faker';
import express from 'express';

import { capitalize } from './util.mjs';

const router = express.Router();

router.get('/', (request, response, next) => {
  response.send("Prisma");
});

router.get('/users/', async (request, response, next) => {
  const users = await request.prisma.user.findMany({
    include: {
      posts: true
    }
  });
  response.send(users);
});

// TODO: look into typing the extended request
router.post('/users', async (request, response, next) => {
  const baseName = capitalize(faker.word.noun());
  const modifier = capitalize(faker.word.adjective()) + capitalize(faker.word.verb());
  const username = modifier + baseName + faker.number.int({ max: 999 });
  const email = faker.internet.email({ lastName: baseName });

  await request.prisma.user.create({
    data: {
      username: username,
      email   : email,
      posts   : {
        create: {
          title: `Hi, I'm ${ username }!`
        }
      }
    }
  });

  response.send(`Created new user: ${ username }, ${ email }`);
});

export default router;
