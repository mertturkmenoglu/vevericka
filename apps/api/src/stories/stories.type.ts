import { Prisma } from "@prisma/client";

export type TStoryResult = Prisma.StoryGetPayload<{
  include: Required<Omit<Prisma.StoryInclude, "_count">>;
}>;
