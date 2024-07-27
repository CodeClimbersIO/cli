import { IsDateString } from 'class-validator'

export class GetCategoryTimeOverviewDto {
  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string
}
