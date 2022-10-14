import { Module } from '@nestjs/common';
import { FinancialTransactionController } from './financial-transaction.controller';
import { FinancialTransactionService } from './financial-transaction.service';
import { FinancialTransactionEntity } from './financial-transaction.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [FinancialTransactionEntity] }),
  ],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService],
})
export class FinancialTransactionModule {}
