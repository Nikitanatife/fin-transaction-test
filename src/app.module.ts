import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  FinancialTransactionController,
  FinancialTransactionModule,
  FinancialTransactionService,
  FinancialTransactionRepository,
} from './financial-transaction';

@Module({
  imports: [MikroOrmModule.forRoot(), FinancialTransactionModule],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService, FinancialTransactionRepository],
})
export class AppModule {}
