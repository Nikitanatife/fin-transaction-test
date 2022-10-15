import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/base.entity';

@Entity({
  tableName: 'user',
})
export class UserEntity extends BaseEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ nullable: true })
  token: string;
}
