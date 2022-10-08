import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { parse, ParseResult } from 'papaparse';
import { InjectRepository } from '@mikro-orm/nestjs';
import { FinancialTransactionEntity } from '../entities/financial-transaction.entity';
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

    console.log(parsedCSV);
    await this._transactionRepository.create(parsedCSV);
  }
}
