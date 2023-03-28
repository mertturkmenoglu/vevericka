import { Prisma } from "@prisma/client";

export const postsInclude = {
  user: true,
  images: true,
  tags: true,
  videos: true,
  _count: {
    select: {
      comments: true,
      dislikes: true,
      likes: true,
      tags: true,
    },
  },
} as const satisfies Prisma.PostInclude;
