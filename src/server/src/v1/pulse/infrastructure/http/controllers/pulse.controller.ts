import { Controller, Get, Query } from '@nestjs/common'
import { ActivitiesService } from '../../../application/services/activities.service'
import { GetCategoryTimeOverviewDto } from '../../../application/dtos/getCategoryTimeOverview.dto'
import { GetWeekOverviewDto } from '../../../application/dtos/getWeekOverview.dto'

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
    const result: CodeClimbers.WeekOverview =
      await this.activitiesService.getWeekOverview(dto.date)
    return { message: 'success', data: result }
  }

  @Get('categoryTimeOverview')
  async getCategoryTimeOverview(
    @Query() times: GetCategoryTimeOverviewDto,
  ): Promise<CodeClimbers.TimeOverviewDao> {
    const result: CodeClimbers.TimeOverview[] =
      await this.activitiesService.getCategoryTimeOverview(
        times.startDate,
        times.endDate,
      )
    return { message: 'success', data: result }
  }
}
