ALTER TABLE "bookmarks" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmarks" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "follow_requests" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "follow_requests" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post_votes" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post_votes" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL;