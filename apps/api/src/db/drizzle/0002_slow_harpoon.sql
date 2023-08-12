ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "banner" SET DEFAULT 'banner.png';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "banner" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_auth_id_auths_id_fk" FOREIGN KEY ("auth_id") REFERENCES "auths"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
