import * as dotenv from 'dotenv';
import { HttpException, HttpStatus } from '@nestjs/common';
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
}

const configService = new ConfigService(process.env);

export { configService };
