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

    return {
      url,
      title: res.ogTitle || null,
      description: res.ogDescription || null,
      image: res.ogImage?.url || null,
    };
  }
}
