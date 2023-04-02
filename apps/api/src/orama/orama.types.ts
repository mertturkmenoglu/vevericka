// @ts-ignore
import { Schema } from "@orama/orama";
import { Post, User, Tag, PostImage, PostVideo } from "@prisma/client";

export type PostCreatedPayload = Post & {
  user: User;
  tags: Tag[];
  images: PostImage[];
  videos: PostVideo[];
  _count: {
    readonly dislikes: number;
    readonly likes: number;
    readonly tags: number;
    readonly comments: number;
  };
};

export const schema = {
  id: "string",
  content: "string",
  name: "string",
} as const satisfies Schema;
