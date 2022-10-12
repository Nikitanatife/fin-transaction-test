import { EntityRepository } from '@mikro-orm/postgresql';
import { FinancialTransactionEntity } from '../entities';

export class FinancialTransactionRepository extends EntityRepository<FinancialTransactionEntity> {}
