DROP TABLE "post_references";--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "reference_id" uuid;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "reference_type" "post_references_enum";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reference_idx" ON "posts" ("reference_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_reference_id_posts_id_fk" FOREIGN KEY ("reference_id") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
