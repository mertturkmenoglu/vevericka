import { Field, ObjectType } from "@nestjs/graphql";
import { Count } from "../../common/models/count.model";
import { Tag } from "../../explore/models/tag.model";
import { User } from "../../users/models/user.model";
import { PostImage } from "./post-image.model";
import { PostVideo } from "./post-video.model";

@ObjectType({ description: "post" })
export class Post {
  @Field()
  id!: string;

  @Field()
  content!: string;

  @Field(() => User)
  user!: User;

  @Field(() => [Tag])
  tags!: Tag[];

  @Field(() => [PostImage])
  images!: PostImage[];

  @Field(() => [PostVideo])
  videos!: PostVideo[];

  @Field()
  vote!: string;

  @Field(() => Count)
  _count!: Count;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
