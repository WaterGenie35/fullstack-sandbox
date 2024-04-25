import { relations } from "drizzle-orm";
import { integer, text, sqliteTable, customType } from "drizzle-orm/sqlite-core";
import { ulid as generateULID } from 'ulid';

// TODO: check how to type this with jsdoc (generics?)
const ulidBuilder = customType({
  dataType  : () => 'CHAR(26)',
  toDriver  : (value) => value || generateULID(),
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

export const users = sqliteTable('users', {
  id      : ulid('id').primaryKey(),
  email   : text('email').unique(),
  username: text('username')
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const posts = sqliteTable('posts', {
  id       : ulid('id').primaryKey(),
  title    : text('title').notNull(),
  content  : text('content'),
  published: integer('published', { mode: 'boolean' }),
  authorId : integer('author_id', { mode: 'number' }).notNull()
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [ posts.authorId ], references: [ users.id ] })
}));
