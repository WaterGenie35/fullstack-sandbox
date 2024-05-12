CREATE TABLE IF NOT EXISTS "posts" (
	"id" "CHARACTER(26)" PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"published" boolean,
	"author_id" "CHARACTER(26)" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" "CHARACTER(26)" PRIMARY KEY NOT NULL,
	"email" text,
	"username" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
