import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: Date, columnType: 'timestamp', default: 'now()' })
  createdAt: Date = new Date();

  @Property({
    type: Date,
    columnType: 'timestamp',
    onUpdate: () => new Date(),
    default: 'now()',
  })
  updatedAt: Date = new Date();
}
