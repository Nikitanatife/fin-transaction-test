import { Migration } from '@mikro-orm/migrations';

export class Migration20221015142212 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "created_at" type timestamp using ("created_at"::timestamp);',
    );
    this.addSql(
      'alter table "transaction" alter column "created_at" set default \'now()\';',
    );
    this.addSql(
      'alter table "transaction" alter column "updated_at" type timestamp using ("updated_at"::timestamp);',
    );
    this.addSql(
      'alter table "transaction" alter column "updated_at" set default \'now()\';',
    );
    this.addSql(
      'alter table "transaction" alter column "date" type date using ("date"::date);',
    );

    this.addSql(
      'alter table "user" add column "first_name" varchar(255) not null, add column "last_name" varchar(255) not null;',
    );
    this.addSql(
      'alter table "user" alter column "created_at" type timestamp using ("created_at"::timestamp);',
    );
    this.addSql(
      'alter table "user" alter column "created_at" set default \'now()\';',
    );
    this.addSql(
      'alter table "user" alter column "updated_at" type timestamp using ("updated_at"::timestamp);',
    );
    this.addSql(
      'alter table "user" alter column "updated_at" set default \'now()\';',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));',
    );
    this.addSql(
      'alter table "transaction" alter column "created_at" set default \'CURRENT_TIMESTAMP\';',
    );
    this.addSql(
      'alter table "transaction" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));',
    );
    this.addSql(
      'alter table "transaction" alter column "updated_at" set default \'CURRENT_TIMESTAMP\';',
    );
    this.addSql(
      'alter table "transaction" alter column "date" type timestamptz(0) using ("date"::timestamptz(0));',
    );

    this.addSql(
      'alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));',
    );
    this.addSql(
      'alter table "user" alter column "created_at" set default \'CURRENT_TIMESTAMP\';',
    );
    this.addSql(
      'alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));',
    );
    this.addSql(
      'alter table "user" alter column "updated_at" set default \'CURRENT_TIMESTAMP\';',
    );
    this.addSql('alter table "user" drop column "first_name";');
    this.addSql('alter table "user" drop column "last_name";');
  }
}
