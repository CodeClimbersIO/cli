import { Injectable, Logger } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import sqlReaderUtil from '../../utils/sqlReader.util'

interface MinutesQuery {
  minutes: number
}

@Injectable()
export class PulseRepo {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  tableName = 'activities_pulse'
  pulseDb = this.knex<CodeClimbers.Pulse>(this.tableName)

  async getStatusBarDetails(): Promise<CodeClimbers.WakatimePulseStatusDao[]> {
    const getTimeQuery = await sqlReaderUtil.getFileContentAsString(
      'getStatusBarDetails.sql',
    )
    return this.knex.raw(getTimeQuery)
  }
  async getLatestPulses(): Promise<CodeClimbers.Pulse[] | undefined> {
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
      .orderBy('created_at', 'desc')
      .limit(10)
    return res
  }

  async getLongestDayMinutes(date: string): Promise<number> {
    const currentDate = new Date(date)
    const weekStart = new Date(
      new Date(date).setDate(currentDate.getDate() - 7),
    )
    const weekMinutesQuery = await sqlReaderUtil.getFileContentAsString(
      'timeQueries/getLongestDayMinutes.sql',
    )
    const [longestDayMinutes] = await this.knex.raw<MinutesQuery[]>(
      weekMinutesQuery,
      {
        startDate: weekStart.toISOString(),
        endDate: currentDate.toISOString(),
      },
    )
    return longestDayMinutes.minutes
  }

  async getWeekMinutes(date: string): Promise<number> {
    const currentDate = new Date(date)
    const weekStart = new Date(
      new Date(date).setDate(currentDate.getDate() - 7),
    )

    const weekMinutesQuery = await sqlReaderUtil.getFileContentAsString(
      'timeQueries/getRangeTotalMinutes.sql',
    )
    const [weekMinutes] = await this.knex.raw<MinutesQuery[]>(
      weekMinutesQuery,
      {
        startDate: weekStart.toISOString(),
        endDate: currentDate.toISOString(),
      },
    )
    return weekMinutes.minutes
  }

  async getCategoryTimeOverview(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.TimeOverviewDao[]> {
    const getTimeQuery = await sqlReaderUtil.getFileContentAsString(
      'timeQueries/getCategoryTimeOverview.sql',
    )
    return this.knex.raw(getTimeQuery, { startDate, endDate })
  }

  async createPulse(pulse: CodeClimbers.Pulse) {
    Logger.log('Creating pulse', 'pulse.repo')
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName).insert(
      pulse,
    )
    return res
  }

  async createPulses(pulses: CodeClimbers.Pulse[]) {
    Logger.log('Creating pulses', 'pulse.repo')
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName).insert(
      pulses,
    )
    Logger.log(`created ${pulses.length} pulses`, 'pulse.repo')
    return res
  }
}
