import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ReportParamsDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  byMonth: boolean;
}
