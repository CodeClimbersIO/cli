import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ReportService } from '../v1/activities/report.service'
import dayjs from 'dayjs'
import { UserService } from '../v1/users/user.service'
import axios from 'axios'
import { isProd } from '../../utils/environment.util'

const platformUrl = isProd()
  ? 'https://platform.codeclimbers.io/api'
  : 'http://localhost:8000/api'

@Injectable()
export class ScheduledTaskService {
  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService,
  ) {
    this.reportService = reportService
    this.userService = userService
  }
  @Cron('0 8 * * 1')
  handleWeeklyReport() {
    this.sendWeeklyReport()
    // Add your actual function logic here
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleWeeklyReportDebug() {
    // this.sendWeeklyReport()
    // Add your actual function logic here
  }

  private async sendWeeklyReport() {
    const startOfWeek = dayjs().subtract(1, 'week').startOf('week')
    const scores = await this.reportService.getWeeklyScores(startOfWeek)
    const user = await this.userService.getCurrentUser()
    if (user.weeklyReportType === 'none') return

    try {
      const response = await axios.post(`${platformUrl}/weekly-report`, {
        email: user.email,
        weeklyReport: scores,
        startOfWeek: startOfWeek.toISOString(),
      })

      Logger.log(`Weekly report sent successfully for user ${user.email}`)
      Logger.log(`Response status: ${response.status}`)
    } catch (error) {
      Logger.error(
        `Error sending weekly report for user ${user.email}:`,
        error.message,
      )
    }

    Logger.log(scores.totalScore)
    Logger.log(user)
  }
}
