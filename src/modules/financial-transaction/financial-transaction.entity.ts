import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/base.entity';
import { UserEntity } from '../user';

enum TransactionSource {
  INCOME = 'income',
  CUSTOM = 'custom-source',
  OTHER = 'other',
}

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
  source: TransactionSource;

  @Property({ nullable: true })
  description: string;

  @ManyToOne()
  user: UserEntity;
}

export { TransactionSource };
