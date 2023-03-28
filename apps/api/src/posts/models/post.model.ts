import { Field, ObjectType } from "@nestjs/graphql";
import { Tag } from "src/explore/models/tag.model";
import { User } from "../../users/models/user.model";
import { PostImage } from "./post-image.model";
import { PostVideo } from "./post-video.model";

@ObjectType({ description: "post" })
export class Post {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [PostImage])
  images: PostImage[];

  @Field(() => [PostVideo])
  videos: PostVideo[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
