import { Injectable, UseGuards } from "@nestjs/common";
import { OramaService } from "../orama/orama.service";
import { Results } from "./models/results.model";

@Injectable()
export class SearchService {
  constructor(private readonly orama: OramaService) {}

  async searchPosts(term: string): Promise<any> {
    return await this.orama.searchPosts(term, "*");
  }
}
