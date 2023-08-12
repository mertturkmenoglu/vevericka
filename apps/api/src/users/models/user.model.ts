import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  image!: string;

  @Field({ nullable: true })
  job!: string | null;

  @Field({ nullable: true })
  twitterHandle!: string | null;

  @Field({ nullable: true })
  school!: string | null;

  @Field({ nullable: true })
  birthDate!: string | null;

  @Field({ nullable: true })
  website!: string | null;

  @Field({ nullable: true })
  description!: string | null;

  @Field()
  verified!: boolean;

  @Field()
  protected!: boolean;

  @Field()
  banner!: string;

  @Field({ nullable: true })
  gender!: string | null;

  @Field({ nullable: true })
  location!: string | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
