import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from 'src/posts/models/post.model';

@ObjectType({ description: "Bookmark" })
export class Bookmark {
  @Field()
  id: string;

  @Field(() => Post)
  post: Post;
}
