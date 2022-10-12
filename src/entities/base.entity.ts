import { Entity, PrimaryKey, Property, types } from '@mikro-orm/core';

@Entity({ abstract: true })
export class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: types.datetime, default: 'now()' })
  createdAt: Date = new Date();

  @Property({
    type: types.datetime,
    onUpdate: () => new Date(),
    default: 'now()',
  })
  updatedAt: Date = new Date();
}
