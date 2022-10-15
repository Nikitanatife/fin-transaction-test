import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../../config';

@Module({
  imports: [
    JwtModule.register({
      secret: configService.getJwtSecret() || 'JWT_SUPER_SECRET',
      signOptions: { expiresIn: configService.getJwtExpiration() },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
