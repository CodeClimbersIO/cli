import { Controller, Get, Query, Res } from '@nestjs/common'
import { ActivitiesService } from './activities.service'
import { GetCategoryTimeOverviewDto } from './dtos/getCategoryTimeOverview.dto'
import { Response } from 'express'

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
