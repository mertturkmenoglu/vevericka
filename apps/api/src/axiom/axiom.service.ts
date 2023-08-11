import { Axiom } from '@axiomhq/js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiomService {
  private readonly client = new Axiom({
    token: process.env['AXIOM_TOKEN'],
    orgId: process.env['AXIOM_ORG_ID'],
  });
  private readonly dataset = process.env['AXIOM_DATASET'] ?? '';

  async sendEvents(events: Array<object> | object) {
    this.client.ingest(this.dataset, events);
    return await this.client.flush();
  }

  async sendString(message: string) {
    return await this.sendEvents({ message });
  }
}
