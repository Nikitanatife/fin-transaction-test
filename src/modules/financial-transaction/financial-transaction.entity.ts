import { Entity, Enum, Property } from '@mikro-orm/core';
import { TransactionSource } from '../../constants';
import { BaseEntity } from '../../entities/base.entity';

@Entity({
  tableName: 'transaction',
})
export class FinancialTransactionEntity extends BaseEntity {
  @Property()
  date: Date;

  @Property()
  sum: number;

  @Property()
  @Enum(() => TransactionSource)
  source: string;

  @Property({ nullable: true })
  description: string;
}
