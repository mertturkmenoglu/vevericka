import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PostCreatedPayload, schema } from "./orama.types";

// @ts-ignore
import type { Orama, Results, SearchParams } from "@orama/orama";

// @ts-ignore
import { create, insert, search } from "@orama/orama";

// @ts-ignore
import { persistToFile, restoreFromFile } from "@orama/plugin-data-persistence";

@Injectable()
export class OramaService implements OnModuleInit, OnModuleDestroy {
  private db: Orama;
  private readonly filePath = "./src/orama/orama.mps";

  async onModuleInit() {
    try {
      this.db = await restoreFromFile<typeof schema>("binary", this.filePath);
    } catch (e) {
      this.db = await create({
        schema,
      });
    }
  }

  async onModuleDestroy() {
    await persistToFile(this.db, "binary", this.filePath);
  }

  async onPostCreated(payload: PostCreatedPayload) {
    const insertedId = await insert(this.db, {
      id: payload.id,
      content: payload.content,
      name: payload.user.name,
    });
    return insertedId;
  }

  async searchPosts(
    term: string,
    properties: SearchParams["properties"]
  ): Promise<Results> {
    const searchResult = await search(this.db, {
      term,
      properties,
    });
    return searchResult;
  }
}
