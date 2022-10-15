import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] }), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
