import { Module } from '@nestjs/common';
import { AxiomService } from './axiom.service';

@Module({
  providers: [AxiomService],
  exports: [AxiomService],
})
export class AxiomModule {}
