import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FinancialTransactionModule } from './modules/financial-transaction';

@Module({
  imports: [MikroOrmModule.forRoot(), FinancialTransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
