import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { TransactionSource } from './constants';
import { BaseEntity } from '../../entities/base.entity';
import { UserEntity } from '../user';

@Entity({
  tableName: 'transaction',
})
export class FinancialTransactionEntity extends BaseEntity {
  @Property({ columnType: 'date' })
  date: Date;

  @Property()
  sum: number;

  @Property()
  @Enum(() => TransactionSource)
  source: string;

  @Property({ nullable: true })
  description: string;

  @ManyToOne()
  user: UserEntity;
}
