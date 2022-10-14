import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { parse, ParseResult } from 'papaparse';
import { InjectRepository } from '@mikro-orm/nestjs';
import { FinancialTransactionEntity } from './financial-transaction.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class FinancialTransactionService {
  constructor(
    @InjectRepository(FinancialTransactionEntity)
    private readonly _transactionRepository: EntityRepository<FinancialTransactionEntity>,
  ) {}
  async upload(path: string) {
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
        });
      }),
    );

    await this._transactionRepository.persistAndFlush(finTransactions);

    return finTransactions;
  }
}
