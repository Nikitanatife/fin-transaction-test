import { Migration } from '@mikro-orm/migrations';

export class Migration20221008083543 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "user" (
            "id" serial primary key,
            "email" varchar(255) not null,
            "password" varchar(255) not null,
            "token" varchar(255) not null);`,
    );
  }
  async down(): Promise<void> {
    this.addSql('drop table "user";');
  }
}
