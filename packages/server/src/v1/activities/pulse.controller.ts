import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { ActivitiesService } from './activities.service'
import { Response } from 'express'
import { GetCategoryTimeOverviewDto } from '../dtos/getCategoryTimeOverview.dto'
import { GetWeekOverviewDto } from '../dtos/getWeekOverview.dto'

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

  @Post('categoryTimeOverview')
  async getCategoryTimeOverview(
    @Body() times: GetCategoryTimeOverviewDto,
  ): Promise<CodeClimbers.TimeOverviewDao> {
    const result = await this.activitiesService.getCategoryTimeOverview(
      times.periods,
    )
    return { message: 'success', data: result }
  }

  @Get('sources')
  async getSources(): Promise<
    Promise<{
      message: string
      data: CodeClimbers.Source[] | []
    }>
  > {
    const sources = await this.activitiesService.getSources()
    return { message: 'success', data: sources }
  }

  @Get('export')
  async exportPulses(@Res() response: Response): Promise<void> {
    try {
      const csvBuffer = await this.activitiesService.generatePulsesCSV()
      response.setHeader('Content-Type', 'text/csv')
      response.setHeader(
        'Content-Disposition',
        'attachment; filename="pulses.csv"',
      )
      response.send(csvBuffer)
    } catch (error) {
      console.error('Error exporting pulses CSV:', error)
      response.status(500).send('Failed to export pulses')
    }
  }
}
