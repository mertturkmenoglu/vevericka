import { BadRequestException, Injectable } from "@nestjs/common";
import { LinkPreview } from "./models/link.model";
const ogs = require("open-graph-scraper");

@Injectable()
export class LinkService {
  private readonly lookupCache = new Map<string, LinkPreview>();

  async getLinkPreview(url: string): Promise<LinkPreview> {
    if (this.lookupCache.has(url)) {
      return this.lookupCache.get(url);
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

    this.lookupCache.set(url, result);

    return result;
  }
}
