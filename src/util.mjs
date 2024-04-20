import { faker } from "@faker-js/faker";

/**
 * Capitalize the first letter of a string
 * https://stackoverflow.com/a/1026087
 * @param {string} string
 * @returns {string}
 */
export function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param {number | null} seed
 * @returns user
 */
export function generateUser (seed = null) {
  if (seed !== null) {
    faker.seed(seed);
  }

  const baseName = capitalize(faker.word.noun());
  const modifier = capitalize(faker.word.adjective()) + capitalize(faker.word.verb());
  const username = modifier + baseName + faker.number.int({ max: 999 });
  const email = faker.internet.email({ lastName: baseName });

  return {
    username: username,
    email   : email,
    // TODO: make this use post generator
    posts   : {
      create: {
        title: `Hi, I'm ${ username }!`
      }
    }
  };
}
