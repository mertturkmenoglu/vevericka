import { BadRequestException, Injectable } from "@nestjs/common";
import { LinkPreview } from "./models/link.model";
const ogs = require("open-graph-scraper");

@Injectable()
export class LinkService {
  constructor() {}

  async getLinkPreview(url: string): Promise<LinkPreview> {
    const ogsResult = await ogs({
      url,
    });

    if (ogsResult.error) {
      throw new BadRequestException("Cannot get link preview");
    }

    const res = ogsResult.result;

    const image =
      res.ogImage?.url ||
      res.ogImage?.at(0)?.url ||
      res.twitterImage?.url ||
      null;

    const title = res.ogTitle || res.ogSiteName || null;

    return {
      url,
      title,
      description: res.ogDescription || null,
      image,
    };
  }
}
