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

  async getLongestDayInRangeMinutes(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const result: MinutesQuery = await this.knex<MinutesQuery[]>(this.tableName)
      .with('getMinutes', (db) => {
        db.count('* as day')
          .from(this.tableName)
          .whereBetween('time', [
            startDate.toISOString(),
            endDate.toISOString(),
          ])
          .groupBy(this.knex.raw("strftime('%s', time) / (60 * 60 * 24)"))
      })
      .max('day as minutes')
      .first()
      .from('getMinutes')

    return result.minutes
  }

  async getRangeMinutes(startDate: Date, endDate: Date): Promise<number> {
    const result: MinutesQuery = await this.knex<MinutesQuery[]>(this.tableName)
      .with('getMinutes', (db) => {
        db.count()
          .from(this.tableName)
          .whereBetween('time', [
            startDate.toISOString(),
            endDate.toISOString(),
          ])
          .groupBy(this.knex.raw("strftime('%s', time) / 60"))
      })
      .count('* as minutes')
      .first()
      .from('getMinutes')

    return result.minutes
  }

  async getCategoryTimeOverview(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.TimeOverviewDao[]> {
    const getTimeQuery = await sqlReaderUtil.getFileContentAsString(
      'getCategoryTimeOverview.sql',
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
