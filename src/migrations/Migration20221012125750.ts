import { Migration } from '@mikro-orm/migrations';

export class Migration20221012125750 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "user" (
            "id" serial primary key,
            "created_at" timestamp not null default \'now()\',
            "updated_at" timestamp not null default \'now()\',
            "email" varchar(255) not null,
            "password" varchar(255) not null,
            "token" varchar(255) null
            );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }
}
