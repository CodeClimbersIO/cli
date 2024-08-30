import { IsArray, IsDateString, ValidateNested } from 'class-validator'

export class TimePeriodDto {
  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string
}

export class GetCategoryTimeOverviewDto {
  @IsArray()
  @ValidateNested({ each: true })
  periods: TimePeriodDto[]
}
