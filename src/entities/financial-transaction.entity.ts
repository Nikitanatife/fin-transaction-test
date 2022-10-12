import { Entity, Enum, Property } from '@mikro-orm/core';
import { TranscationSource } from '../constants';
import { BaseEntity } from './base.entity';

@Entity({
  tableName: 'transaction',
})
export class FinancialTransactionEntity extends BaseEntity {
  @Property()
  date: Date;

  @Property()
  sum: number;

  @Property()
  @Enum(() => TranscationSource)
  source: string;

  @Property({ nullable: true })
  description: string;
}
