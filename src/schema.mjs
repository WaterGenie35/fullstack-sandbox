import { relations } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id      : integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email   : text('email').unique(),
  username: text('username')
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const posts = sqliteTable('posts', {
  id       : integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title    : text('title').notNull(),
  content  : text('content'),
  published: integer('published', { mode: 'boolean' }),
  authorId : integer('author_id', { mode: 'number' }).notNull()
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [ posts.authorId ], references: [ users.id ] })
}));
