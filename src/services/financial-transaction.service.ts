import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { parse, ParseResult } from 'papaparse';

@Injectable()
export class FinancialTransactionService {
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
  }
}
