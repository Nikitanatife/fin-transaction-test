import { Module } from '@nestjs/common';
import { FinancialTransactionController } from './financial-transaction.controller';
import { FinancialTransactionService } from './financial-transaction.service';
import { FinancialTransactionRepository } from './financial-transaction.repository';
import { FinancialTransactionEntity } from '../entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [FinancialTransactionEntity] }),
  ],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService, FinancialTransactionRepository],
})
export class FinancialTransactionModule {}
