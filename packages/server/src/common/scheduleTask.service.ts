import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ReportService } from '../v1/activities/report.service'
import dayjs, { extend } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
extend(isoWeek)

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
    const startOfWeek = dayjs()
      .startOf('week')
      .subtract(1, 'week')
      .add(1, 'day')
    const scores = await this.reportService.getWeeklyScores(startOfWeek)
    const user = await this.userService.getCurrentUser()

    if (user.weeklyReportType === 'none') return

    if (user.weeklyReportType === 'ai') {
      try {
        const response = await axios.post(`${platformUrl}/ai-weekly-report`, {
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
    }

    if (user.weeklyReportType === 'standard') {
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
    }

    Logger.log(scores.totalScore)
    Logger.log(user)
  }
}
