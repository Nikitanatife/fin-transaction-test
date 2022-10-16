import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { parse, ParseResult } from 'papaparse';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  FinancialTransactionEntity,
  TransactionSource,
} from './financial-transaction.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ReportDataInterface, ReportInterface } from './interfaces';
import { UserEntity } from '../user';

@Injectable()
export class FinancialTransactionService {
  constructor(
    @InjectRepository(FinancialTransactionEntity)
    private readonly _transactionRepository: EntityRepository<FinancialTransactionEntity>,
  ) {}
  async upload(user: UserEntity, path: string) {
    const file = await fs.readFile(path);
    const csvData = file.toString();
    const parsedCSV = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string): string =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results: ParseResult<unknown>) => results.data,
    });
    const finTransactions = await Promise.all(
      parsedCSV.data.map((transaction: any) => {
        const { date = '', sum, source, description } = transaction;
        const [day, month, year] = date.split('-');
        return this._transactionRepository.create({
          source,
          sum,
          description,
          date: new Date(`${Number(month) + 1}/${day}/${year}`),
          user: user.id,
        });
      }),
    );

    await this._transactionRepository.persistAndFlush(finTransactions);

    return finTransactions;
  }

  async getReport(user: UserEntity, byMonth = false) {
    let reportsData: ReportDataInterface[] = [];

    if (byMonth) {
      reportsData = await this.buildReport(user.id);
    } else {
      reportsData = await this.buildReportByMonth(user.id);
    }

    const reports: ReportInterface[] = Object.values(TransactionSource).map(
      (sourceType) => ({
        source: sourceType,
        data: reportsData
          .map(({ source, total, month, year, date }) =>
            source === sourceType
              ? { total, date: byMonth ? `${month} ${year}` : date }
              : null,
          )
          .filter((report) => report),
      }),
    );

    return reports;
  }

  private async buildReport(userId): Promise<ReportDataInterface[]> {
    return this._transactionRepository
      .createQueryBuilder('t')
      .select([
        't.source',
        `to_char(date_trunc('year', t."date"), 'YYYY')  as "year"`,
        `to_char(date_trunc('month', t."date"), 'Mon')  as "month"`,
        'sum(t.sum) as total',
      ])
      .where({ user: userId })
      .groupBy([
        't."source"',
        `date_trunc('year', t."date")`,
        `date_trunc('month', t."date")`,
      ])
      .execute();
  }

  private async buildReportByMonth(userId): Promise<ReportDataInterface[]> {
    return this._transactionRepository
      .createQueryBuilder('t')
      .select(['t.source', 't."date"', 'sum(t.sum) as total'])
      .where({ user: userId })
      .groupBy(['t."source"', 't."date"'])
      .execute();
  }
}
