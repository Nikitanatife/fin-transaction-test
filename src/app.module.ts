import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { configService } from './config';
import { FinancialTransactionController } from './controllers';
import { FinancialTransactionService } from './services';

@Module({
  imports: [MikroOrmModule.forRoot(configService.getMicroORMConfig())],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService],
})
export class AppModule {}
