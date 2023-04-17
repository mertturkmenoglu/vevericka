import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "user" })
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

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

  @Field()
  verified: boolean;

  @Field()
  protected: boolean;

  @Field()
  bannerImage: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  genderOther?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
