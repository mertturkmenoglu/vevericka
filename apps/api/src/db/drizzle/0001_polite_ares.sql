CREATE TABLE IF NOT EXISTS "user_description_mentions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_description_id" uuid NOT NULL,
	"mention" varchar(256) NOT NULL,
	"mentioned_user_id" uuid,
	"start" smallint NOT NULL,
	"end" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_description_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_description_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_description_urls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_description_id" uuid NOT NULL,
	"url" varchar(256) NOT NULL,
	"start" smallint NOT NULL,
	"end" smallint NOT NULL,
	"meta" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_descriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"description" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pinned_post_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_pinned_post_id_auths_id_fk" FOREIGN KEY ("pinned_post_id") REFERENCES "auths"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_description_mentions" ADD CONSTRAINT "user_description_mentions_user_description_id_user_descriptions_id_fk" FOREIGN KEY ("user_description_id") REFERENCES "user_descriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_description_mentions" ADD CONSTRAINT "user_description_mentions_mentioned_user_id_users_id_fk" FOREIGN KEY ("mentioned_user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_description_tags" ADD CONSTRAINT "user_description_tags_user_description_id_user_descriptions_id_fk" FOREIGN KEY ("user_description_id") REFERENCES "user_descriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_description_tags" ADD CONSTRAINT "user_description_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_description_urls" ADD CONSTRAINT "user_description_urls_user_description_id_user_descriptions_id_fk" FOREIGN KEY ("user_description_id") REFERENCES "user_descriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_descriptions" ADD CONSTRAINT "user_descriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
