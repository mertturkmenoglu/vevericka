import { Module } from '@nestjs/common';
import { ExampleResolver } from './example.resolver';
import { DbModule } from '@/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ExampleResolver],
})
export class ExampleModule {}
