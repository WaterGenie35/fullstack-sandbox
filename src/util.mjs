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
export function generateUser (seed = null, overrides = {}) {
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
    ...overrides
  };
}

export function generatePost (author, seed = null, overrides = {}) {
  if (seed !== null) {
    faker.seed(seed);
  }

  return {
    title    : faker.lorem.sentence(),
    content  : faker.lorem.paragraph(),
    published: faker.datatype.boolean(),
    authorId : author.id,
    ...overrides
  };
}
