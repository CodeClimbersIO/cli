import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator'

export class GetPerProjectOverviewDto {
  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string

  @IsString()
  @IsOptional()
  category: string

  @IsNumber()
  @IsOptional()
  limit: number

  @IsNumber()
  @IsOptional()
  page: number
}
