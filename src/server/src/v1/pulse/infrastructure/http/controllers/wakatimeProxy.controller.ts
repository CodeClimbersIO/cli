import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import { ActivitiesService } from '../../../application/services/activities.service'
import { CreateWakatimePulseDto } from '../../../application/dtos/createWakatimePulse.dto'

@Controller('wakatime')
export class WakatimeController {
  constructor(private readonly activitiesService: ActivitiesService) {
    this.activitiesService = activitiesService
  }
  @Get('users/current/statusbar/today')
  async getStatusBar(): Promise<CodeClimbers.ActivitiesStatusBar> {
    const result = await this.activitiesService.getActivityStatusBar()
    return result
  }

  @Post('users/current/heartbeats')
  async createPulse(@Body() body: CreateWakatimePulseDto): Promise<{
    Responses: number[][]
  }> {
    Logger.log(JSON.stringify(body), 'wakatimeProxy.controller')
    const result = await this.activitiesService.createPulse(body)
    return result
  }

  @Post('users/current/heartbeats.bulk')
  async createPulses(@Body() body: CreateWakatimePulseDto[]): Promise<{
    Responses: number[][]
  }> {
    Logger.log(JSON.stringify(body), 'wakatimeProxy.controller')
    const result = await this.activitiesService.createPulses(body)
    return result
  }
}
