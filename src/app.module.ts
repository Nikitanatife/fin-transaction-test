import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { configService } from './config';
import {
  FinancialTransactionController,
  FinancialTransactionEntity,
  FinancialTransactionService,
} from './modules/financial-transaction';
import { UserController, UserEntity, UserService } from './modules/user';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [FinancialTransactionEntity, UserEntity],
    }),
    JwtModule.register({
      secret: configService.getJwtSecret() || 'JWT_SUPER_SECRET',
      signOptions: { expiresIn: configService.getJwtExpiration() },
    }),
  ],
  controllers: [FinancialTransactionController, UserController],
  providers: [FinancialTransactionService, UserService],
})
export class AppModule {}
