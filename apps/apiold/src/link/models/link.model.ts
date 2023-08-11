import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Link Preview Model" })
export class LinkPreview {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  url?: string;
}
