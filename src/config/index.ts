import * as dotenv from 'dotenv';
import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TSMigrationGenerator } from '@mikro-orm/migrations';

dotenv.config();

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

  getJwtSecret(): string {
    return this.getValue('JWT_SECRET', true);
  }

  getJwtExpiration(): string {
    return this.getValue('JWT_EXP', true);
  }

  getMicroORMConfig(): MikroOrmModuleSyncOptions {
    return {
      entities: ['./dist/modules/*/*.entity.js'],
      entitiesTs: ['./src/modules/*/*.entity.ts'],
      dbName: this.getValue('POSTGRES_DB', true),
      user: this.getValue('POSTGRES_USER', true),
      password: this.getValue('POSTGRES_PASSWORD', true),
      type: 'postgresql',
      migrations: {
        tableName: 'mikro_orm_migrations',
        path: './dist/migrations',
        pathTs: './src/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        emit: 'ts',
        generator: TSMigrationGenerator,
      },
    };
  }

  getValidationOptions(transform?: true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
      validateCustomDecorators: true,
    };

    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }

    return options;
  }
}

const configService = new ConfigService(process.env);

export { configService };
