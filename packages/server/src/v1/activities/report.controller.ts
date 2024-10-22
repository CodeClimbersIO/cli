import { Controller, Get, Query } from '@nestjs/common'
import { ReportService } from './report.service'
import dayjs from 'dayjs'

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {
    this.reportService = reportService
  }
  @Get('weekly-report')
  async latestPulses(@Query('startDate') startDate: string): Promise<{
    message: string
    data: CodeClimbers.WeeklyScores | undefined
  }> {
    const pulse = await this.reportService.getWeeklyScores(dayjs(startDate))
    return { message: 'success', data: pulse }
  }
}
