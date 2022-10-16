import { TransactionSource } from '../financial-transaction.entity';

export interface ReportDataInterface {
  source: TransactionSource;
  total: number;
  year?: string;
  month?: string;
  date?: string;
}
