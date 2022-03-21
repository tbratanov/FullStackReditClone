import { Migration } from '@mikro-orm/migrations';

export class Migration20220315094242 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "_id" serial primary key, add column "created_at" timestamptz(0) not null default \'NOW()\', add column "updated_at" timestamptz(0) not null, add column "title" text not null;');
  }

}
