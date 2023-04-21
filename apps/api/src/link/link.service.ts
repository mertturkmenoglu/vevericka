import { BadRequestException, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { LinkPreview } from "./models/link.model";

const ogs = require("open-graph-scraper");

@Injectable()
export class LinkService {
  private readonly redis = new Redis();

  private readonly cacheTTL = 60 * 10;

  private readonly cacheKey = "link-preview";

  async getLinkPreview(url: string): Promise<LinkPreview> {
    const cached = await this.redis.get(this.keyWithPrefix(url));

    if (cached) {
      return JSON.parse(cached);
    }

    const ogsResult = await ogs({
      url,
    });

    if (ogsResult.error) {
      throw new BadRequestException("Cannot get link preview");
    }

    const response = ogsResult.result;

    const image =
      response.ogImage?.url ||
      response.ogImage?.at(0)?.url ||
      response.twitterImage?.url ||
      null;

    const title = response.ogTitle || response.ogSiteName || null;

    const result = {
      url,
      title,
      description: response.ogDescription || null,
      image,
    };

    await this.redis.setex(
      this.keyWithPrefix(url),
      this.cacheTTL,
      JSON.stringify(result)
    );

    return result;
  }

  private keyWithPrefix(s: string) {
    return `${this.cacheKey}:${s}`;
  }
}
