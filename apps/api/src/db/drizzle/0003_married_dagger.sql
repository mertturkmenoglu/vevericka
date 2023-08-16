CREATE TABLE IF NOT EXISTS "post_link_previews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_link_previews" ADD CONSTRAINT "post_link_previews_url_id_post_urls_id_fk" FOREIGN KEY ("url_id") REFERENCES "post_urls"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
