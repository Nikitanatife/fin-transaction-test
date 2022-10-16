import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { FinancialTransactionService } from './financial-transaction.service';
import { AuthDto, AuthGuard, User } from '../auth';
import { ReportInterface } from './interfaces';
import { ReportParamsDto } from './dto';
import { configService } from '../../config';

@Controller('/transactions')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../', '../', 'temp'),
      filename(
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) {
        callback(null, file.originalname);
      },
    }),
  }),
)
export class FinancialTransactionController {
  constructor(
    private readonly _financialTransactionService: FinancialTransactionService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('/upload')
  @HttpCode(201)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user: AuthDto,
  ) {
    return await this._financialTransactionService.upload(
      user.userId,
      file.path,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/reports')
  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  async getReport(
    @User() user: AuthDto,
    @Query() query: ReportParamsDto,
  ): Promise<ReportInterface[]> {
    return this._financialTransactionService.getReport(
      user.userId,
      query.byMonth,
    );
  }
}
