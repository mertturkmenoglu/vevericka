import { Args, Query, Resolver } from '@nestjs/graphql';
import { Example } from './models/example.model';
import { DbService } from '@/db/db.service';

@Resolver(() => Example)
export class ExampleResolver {
  constructor(private readonly db: DbService) {}

  @Query(() => Example)
  async example(@Args('id') id: string): Promise<Example | null> {
    return {
      id: id,
    };
  }
}
