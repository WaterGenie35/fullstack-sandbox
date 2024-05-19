import { relations } from "drizzle-orm";
import { boolean, customType, pgTable, text } from 'drizzle-orm/pg-core';
import { ulid as generateULID } from 'ulid';

import { isValidULID, normalizeID } from './util.mjs';

const ulidBuilder = customType({
  // TODO: check how to define the data type;
  // this currently outputs 'CHARACTER(26)' (with the quotes) in the generated sql
  // instead of CHARACTER(26) (without the quotes)
  dataType: () => 'CHARACTER(26)',
  toDriver: (value) => {
    if (!value) {
      return generateULID();
    }
    const normalizedValue = normalizeID(value, { caseSensitive: false });
    if (!isValidULID(normalizedValue)) {
      const isNormalized = value !== normalizedValue;
      const normalizedMessage = isNormalized ? ` (normalized to '${ normalizedValue }')` : '';
      throw new Error(`
        Value '${ value }'${ normalizedMessage } is not a valid ULID.
        Refer to https://github.com/ulid/spec for ULID specification.
      `);
    }
    return normalizedValue;
  },
  fromDriver: (value) => value
});

/**
 * @param {string} name
 * @param {object} config
 * @param {boolean} config.autoGenerate
 */
const ulid = (name, config = { autoGenerate: true }) => {
  const type = ulidBuilder(name);
  if (config.autoGenerate) {
    type.$default(generateULID).notNull();
  }
  return type;
};

export const userTable = pgTable('users', {
  id      : ulid('id').primaryKey(),
  email   : text('email').unique(),
  username: text('username')
});

export const userRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable)
}));

export const postTable = pgTable('posts', {
  id       : ulid('id').primaryKey(),
  title    : text('title').notNull(),
  content  : text('content'),
  published: boolean('published'),
  authorId : ulid('author_id').references(() => userTable.id)
});

export const postRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, { fields: [ postTable.authorId ], references: [ userTable.id ] })
}));
