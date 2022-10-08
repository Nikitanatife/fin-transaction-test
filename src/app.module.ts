import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { configService } from './config';

@Module({
  imports: [MikroOrmModule.forRoot(configService.getMicroORMConfig())],
  controllers: [],
  providers: [],
})
export class AppModule {}
