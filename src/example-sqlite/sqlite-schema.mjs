import { relations } from "drizzle-orm";
import { integer, text, sqliteTable, customType } from "drizzle-orm/sqlite-core";
import { ulid as generateULID } from 'ulid';

import { isValidULID, normalizeID } from "../util.mjs";

const ulidBuilder = customType({
  dataType: () => 'CHAR(26)',
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

export const userTable = sqliteTable('users', {
  id      : ulid('id').primaryKey(),
  email   : text('email').unique(),
  username: text('username')
});

export const userRelations = relations(userTable, ({ many }) => ({
  posts: many(postTable)
}));

export const postTable = sqliteTable('posts', {
  id       : ulid('id').primaryKey(),
  title    : text('title').notNull(),
  content  : text('content'),
  published: integer('published', { mode: 'boolean' }),
  authorId : integer('author_id', { mode: 'number' }).notNull()
});

export const postRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, { fields: [ postTable.authorId ], references: [ userTable.id ] })
}));
