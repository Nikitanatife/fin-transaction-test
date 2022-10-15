import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FinancialTransactionModule } from './modules/financial-transaction';
import { UserModule } from './modules/user';

@Module({
  imports: [MikroOrmModule.forRoot(), FinancialTransactionModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
