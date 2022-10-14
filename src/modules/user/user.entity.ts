import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  token: string;
}
