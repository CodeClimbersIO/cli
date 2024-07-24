import { Controller, Get, Query } from '@nestjs/common'
import { GetCategoryTimeOverviewDto } from './dtos/getCategoryTimeOverview.dto'
import { GetWeekOverviewDto } from './dtos/getWeekOverview.dto'
import { ActivitiesService } from './activities.service'

@Controller('pulses')
export class PulseController {
  constructor(private readonly activitiesService: ActivitiesService) {
    this.activitiesService = activitiesService
  }
  @Get('latest')
  async latestPulses(): Promise<{
    message: string
    data: CodeClimbers.Pulse[] | undefined
  }> {
    const pulse = await this.activitiesService.getLatestPulses()
    return { message: 'success', data: pulse }
  }

  @Get('weekOverview')
  async getWeekOverview(
    @Query() dto: GetWeekOverviewDto,
  ): Promise<CodeClimbers.WeekOverviewDao> {
    const result = await this.activitiesService.getWeekOverview(dto.date)
    return result
  }

  @Get('categoryTimeOverview')
  async getCategoryTimeOverview(
    @Query() times: GetCategoryTimeOverviewDto,
  ): Promise<CodeClimbers.TimeOverviewDao[]> {
    const result = await this.activitiesService.getCategoryTimeOverview(
      times.startDate,
      times.endDate,
    )
    return result
  }
}
