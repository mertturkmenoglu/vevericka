import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Queue } from "bull";
import { AxiomService } from "../axiom/axiom.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStoryInput } from "./dto/create-story.input";
import { StoryFeedElement } from "./models/story-feed-element";
import { Story } from "./models/story.model";
import { TStoryResult } from "./stories.type";

@Injectable()
export class StoriesService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue("stories") private storiesQueue: Queue,
    private readonly axiomService: AxiomService
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

  async getStoryFeedByUserId(userId: string): Promise<StoryFeedElement[]> {
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

    const stories = result.map((story) => this.mapResultToStory(story));
    const grouped: StoryFeedElement[] = [];

    for (const story of stories) {
      const existing = grouped.find((s) => s.user.id === story.user.id);

      if (existing) {
        existing.stories.push(story);
      } else {
        grouped.push({
          user: story.user,
          stories: [story],
          hasSeenAll: false,
        });
      }
    }

    return grouped.map((group) => {
      const hasSeenAll = group.stories.every((s) => s.seen);

      return {
        ...group,
        hasSeenAll,
      };
    });
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
    await this.axiomService.sendString(
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

      await this.axiomService.sendString(
        `Found ${stories.length} stories to delete. Added to queue.`
      );
    }

    await this.axiomService.sendString("Ending checkStoryEndTimes cron job.");
  }

  private mapResultToStory(result: TStoryResult): Story {
    return {
      ...result,
      seen: !!result.seenBy.length,
    };
  }
}
