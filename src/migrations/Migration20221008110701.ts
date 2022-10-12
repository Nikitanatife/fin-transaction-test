import { Migration } from '@mikro-orm/migrations';

export class Migration20221008110701 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "created_at" timestamp not null default now(), add column "updated_at" timestamp not null default now();',
    );
    this.addSql(
      'alter table "user" alter column "token" type varchar(255) using ("token"::varchar(255));',
    );
    this.addSql('alter table "user" alter column "token" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user" alter column "token" type varchar(255) using ("token"::varchar(255));',
    );
    this.addSql('alter table "user" alter column "token" set not null;');
    this.addSql('alter table "user" drop column "created_at";');
    this.addSql('alter table "user" drop column "updated_at";');
  }
}
