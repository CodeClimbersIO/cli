import { Controller, Get, Param } from '@nestjs/common'
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

  @Get('time/:startDate/:endDate')
  async getTime(
    @Param('startDate') startDate: string,
    @Param('startDate') endDate: string,
  ): Promise<CodeClimbers.Time[]> {
    const result = await this.activitiesService.getTimesByDate(
      startDate,
      endDate,
    )
    return result
  }
}
