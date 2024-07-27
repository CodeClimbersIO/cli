import { Injectable, Logger } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import sqlReaderUtil from '../../../../../utils/sqlReader.util'

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

  getMinutesInRangeQuery(startDate: Date, endDate: Date) {
    return this.knex<MinutesQuery[]>(this.tableName)
      .count('* as minutes')
      .from(this.tableName)
      .whereBetween('time', [startDate.toISOString(), endDate.toISOString()])
      .groupBy(this.knex.raw("strftime('%s', time) / 60"))
  }

  async getLongestDayInRangeMinutes(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const getLongestDayMinutesQuery =
      await sqlReaderUtil.getFileContentAsString(
        'getLongestDayInRangeMinutes.sql',
      )
    const [result] = await this.knex.raw<MinutesQuery[]>(
      getLongestDayMinutesQuery,
      {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    )

    return result.minutes
  }

  async getRangeMinutes(startDate: Date, endDate: Date): Promise<number> {
    const result: MinutesQuery = await this.knex<MinutesQuery[]>(this.tableName)
      .with('getMinutes', this.getMinutesInRangeQuery(startDate, endDate))
      .count('* as minutes')
      .first()
      .from('getMinutes')

    return result.minutes
  }

  async getCategoryTimeOverview(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.TimeOverviewDao[]> {
    const query = this.knex<MinutesQuery[]>(this.tableName)
      .select(this.knex.raw('category, count()'))
      .from(this.tableName)
      .whereBetween('time', [startDate, endDate])
      .groupBy(this.knex.raw("strftime('%s', time) / 60"))

    return await this.knex<CodeClimbers.TimeOverviewDao[]>(this.tableName)
      .with('getMinutes', query)
      .select(this.knex.raw('category, count() as minutes'))
      .groupBy('category')
      .from('getMinutes')
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
