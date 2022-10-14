import { Migration } from '@mikro-orm/migrations';

export class Migration20221012125835 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "transaction" (
            "id" serial primary key, 
            "created_at" timestamp not null default \'now()\', 
            "updated_at" timestamp not null default \'now()\', 
            "date" date not null, 
            "sum" int not null, 
            "source" varchar(255) not null, 
            "description" varchar(255) null
            );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transaction" cascade;');
  }
}
