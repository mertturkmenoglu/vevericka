import { Args, Query, Resolver } from '@nestjs/graphql';
import { Example } from './models/example.model';

@Resolver(() => Example)
export class ExampleResolver {
  @Query(() => Example)
  async example(@Args('id') id: string): Promise<Example | null> {
    return {
      id: id,
    };
  }
}
