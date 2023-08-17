ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "auths" ADD COLUMN "account_setup_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
