import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Queue } from "bull";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStoryInput } from "./dto/create-story.input";
import { Story } from "./models/story.model";
import { TStoryResult } from "./stories.type";

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue("stories") private storiesQueue: Queue
  ) {}

  async findOneById(userId: string, id: string): Promise<Story> {
    const result = await this.prisma.story.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        seenBy: {
          where: {
            id: userId,
          },
        },
      },
    });

    return this.mapResultToStory(result);
  }

  async getStoriesByUserId(
    thisUserId: string,
    userId: string
  ): Promise<Story[]> {
    const result = await this.prisma.story.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        user: true,
        seenBy: {
          where: {
            id: thisUserId,
          },
        },
      },
    });

    return result.map(this.mapResultToStory.bind(this));
  }

  async getStoryFeedByUserId(userId: string): Promise<Story[]> {
    const result = await this.prisma.story.findMany({
      where: {
        user: {
          OR: [
            {
              id: userId,
            },
            {
              followers: {
                some: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
      include: {
        user: true,
        seenBy: {
          where: {
            id: userId,
          },
        },
      },
    });

    return result.map(this.mapResultToStory.bind(this));
  }

  async createStory(userId: string, dto: CreateStoryInput): Promise<Story> {
    const result = await this.prisma.story.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        source: dto.source,
        duration: dto.duration,
        endsAt: dto.endsAt,
      },
      include: {
        user: true,
        seenBy: {
          where: {
            id: userId,
          },
        },
      },
    });

    return this.mapResultToStory(result);
  }

  async deleteStory(userId: string, id: string): Promise<Story> {
    const result = await this.prisma.story.delete({
      where: {
        id,
      },
      include: {
        user: true,
        seenBy: {
          where: {
            id: userId,
          },
        },
      },
    });

    return this.mapResultToStory(result);
  }

  async markStoryAsSeen(userId: string, id: string): Promise<Story> {
    const result = await this.prisma.story.update({
      where: {
        id,
      },
      data: {
        seenBy: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
        seenBy: {
          where: {
            id: userId,
          },
        },
      },
    });

    return this.mapResultToStory(result);
  }

  @Cron("0 * * * * *")
  async checkStoryEndTimes() {
    const now = new Date();
    this.logger.verbose(
      `Running Cron job. Checking for stories that have ended at ${now}`
    );

    const stories = await this.prisma.story.findMany({
      where: {
        endsAt: {
          lte: now,
        },
      },
    });

    if (stories.length) {
      await this.storiesQueue.add("deleteStories", {
        ids: stories.map((story) => story.id),
      });

      this.logger.verbose(
        `Found ${stories.length} stories to delete. Added to queue.`
      );
    }

    this.logger.verbose("Ending checkStoryEndTimes cron job.");
  }

  private mapResultToStory(result: TStoryResult): Story {
    return {
      ...result,
      seen: !!result.seenBy.length,
    };
  }
}
