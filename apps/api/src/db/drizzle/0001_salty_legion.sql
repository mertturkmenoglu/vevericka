ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "post_tags" RENAME COLUMN "tag_id" TO "tag";--> statement-breakpoint
ALTER TABLE "post_tags" ALTER COLUMN "tag" SET DATA TYPE varchar(256);