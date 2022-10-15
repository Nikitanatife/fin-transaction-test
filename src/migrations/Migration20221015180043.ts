import { Migration } from '@mikro-orm/migrations';

export class Migration20221015180043 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "transaction" add column "user_id" int not null;');
    this.addSql(
      'alter table "transaction" add constraint "transaction_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_user_id_foreign";',
    );

    this.addSql('alter table "transaction" drop column "user_id";');
  }
}
