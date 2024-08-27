import { IsDateString, IsNumber, IsOptional } from 'class-validator'

export class GetPerProjectOverviewByCategory {
  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string

  @IsNumber()
  @IsOptional()
  limit: number

  @IsNumber()
  @IsOptional()
  page: number
}
