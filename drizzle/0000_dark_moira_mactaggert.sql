CREATE TABLE `posts` (
	`id` CHAR(26) PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text,
	`published` integer,
	`author_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` CHAR(26) PRIMARY KEY NOT NULL,
	`email` text,
	`username` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);