import { TransactionSource } from '../financial-transaction.entity';

interface ReportSourceData {
  date: string;
  total: number;
}

export interface ReportInterface {
  source: TransactionSource;
  data?: ReportSourceData[];
}
