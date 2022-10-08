// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { HttpException, HttpStatus } from '@nestjs/common';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new HttpException(
        `validation:error. config error - missing env.${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return value;
  }

  getPort(): number {
    return +this.getValue('PORT', true);
  }

  getMicroORMConfig(): MikroOrmModuleSyncOptions {
    return {
      entities: ['./dist/entities/*.entity.js'],
      entitiesTs: ['./src/entities/*.entity.ts'],
      dbName: this.getValue('POSTGRES_DB', true),
      user: this.getValue('POSTGRES_USER', true),
      password: this.getValue('POSTGRES_PASSWORD', true),
      type: 'postgresql',
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
