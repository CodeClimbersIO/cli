import { IsDateString } from 'class-validator'

export class GetWeekOverviewDto {
  @IsDateString()
  date: string
}
