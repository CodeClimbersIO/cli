import { IsDateString, IsString } from 'class-validator'

export class GetPerProjectOverviewDto {
  @IsString()
  category: string

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string
}
