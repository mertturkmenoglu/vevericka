import { Prisma } from "@prisma/client";

export type TCount = {
  _count: {
    select: Required<
      Omit<Prisma.PostCountOutputTypeSelect, "images" | "videos" | "Bookmark">
    >;
  };
};

export type TPostResult = Prisma.PostGetPayload<{
  include: Required<Omit<Prisma.PostInclude, "Bookmark">> & TCount;
}>;

export const postsInclude = {
  user: true,
  images: true,
  tags: true,
  videos: true,
  poll: true,
  _count: {
    select: {
      dislikes: true,
      likes: true,
      tags: true,
    },
  },
} as const satisfies Prisma.PostInclude;

export const postsVoteInclude = (userId: string) =>
  ({
    likes: {
      where: {
        id: userId,
      },
    },
    dislikes: {
      where: {
        id: userId,
      },
    },
  } as const satisfies Prisma.PostInclude);
