import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { parse, ParseResult } from 'papaparse';
import { FinancialTransactionRepository } from './financial-transaction.repository';

@Injectable()
export class FinancialTransactionService {
  constructor(
    private readonly _financialTransactionRepository: FinancialTransactionRepository,
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

    console.log(parsedCSV.data);
    await this._financialTransactionRepository.create({
      date: new Date('01-05-2022'),
      sum: 1500,
      source: 'other',
      description: '',
    });
  }
}
