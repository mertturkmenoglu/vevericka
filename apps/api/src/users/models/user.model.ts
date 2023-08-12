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

  @Field(() => String, { nullable: true })
  job!: string | null;

  @Field(() => String, { nullable: true })
  twitterHandle!: string | null;

  @Field(() => String, { nullable: true })
  school!: string | null;

  @Field(() => String, { nullable: true })
  birthDate!: string | null;

  @Field(() => String, { nullable: true })
  website!: string | null;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field()
  verified!: boolean;

  @Field()
  protected!: boolean;

  @Field()
  banner!: string;

  @Field(() => String, { nullable: true })
  gender!: string | null;

  @Field(() => String, { nullable: true })
  location!: string | null;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
