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
 * Removes hyphens, spaces, and underscores, and capitalize if case-insensitive
 * @param {string} id
 * @param {object} config
 * @param {boolean} config.caseSensitive
 * @returns {string}
 */
export function normalizeID (id, config = { caseSensitive: false }) {
  const trimmedId = id.replace(/[-_ ]/g, '');
  return config.caseSensitive ? trimmedId : trimmedId.toUpperCase();
}

/**
 * Checks if the given candidate string is a valid ULID according to https://github.com/ulid/spec
 * @param {string} candidateULID
 * @returns {boolean} whether candidateULID is a valid ULID
 */
export function isValidULID (candidateULID) {
  // https://github.com/yuzu441/is-ulid
  return typeof candidateULID === 'string' && (/^[0-9A-HJKMNP-TV-Z]{26}/).test(candidateULID);
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
