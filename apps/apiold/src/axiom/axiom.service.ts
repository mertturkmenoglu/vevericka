import Client from "@axiomhq/axiom-node";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiomService {
  private readonly client = new Client();
  private readonly dataset = process.env["AXIOM_DATASET"] ?? '';

  async sendEvents(events: Array<object> | object) {
    return await this.client.ingestEvents(this.dataset, events);
  }

  async sendString(message: string) {
    return await this.sendEvents({ message });
  }
}
