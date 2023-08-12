import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name!: string | null;

  @Field({ nullable: true })
  image!: string | null;

  @Field({ nullable: true })
  job!: string | null;

  @Field({ nullable: true })
  twitterHandle!: string | null;

  @Field({ nullable: true })
  school!: string | null;

  @Field({ nullable: true })
  birthDate!: Date | null;

  @Field({ nullable: true })
  website!: string | null;

  @Field({ nullable: true })
  description!: string | null;

  @Field({ nullable: true })
  protected!: boolean | null;

  @Field({ nullable: true })
  banner!: string | null;

  @Field({ nullable: true })
  location!: string | null;

  @Field({ nullable: true })
  gender!: string | null;
}
