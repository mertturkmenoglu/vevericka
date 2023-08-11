import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  job?: string;

  @Field({ nullable: true })
  twitterHandle?: string;

  @Field({ nullable: true })
  school?: string;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  protected?: boolean;

  @Field({ nullable: true })
  bannerImage?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  gender?: string;
}
