import { Module } from '@nestjs/common';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';

@Module({
  providers: [
    LinkResolver,
    {
      provide: LinkService,
      async useFactory() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new LinkService((await import('open-graph-scraper')).default);
      },
    },
  ],
})
export class LinkModule {}
