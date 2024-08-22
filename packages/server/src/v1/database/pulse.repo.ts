import { Injectable, Logger } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import sqlReaderUtil from '../../../utils/sqlReader.util'
import dayjs from 'dayjs'

interface MinutesQuery {
  minutes: number
}

@Injectable()
export class PulseRepo {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  tableName = 'activities_pulse'

  async getStatusBarDetails(): Promise<CodeClimbers.WakatimePulseStatusDao[]> {
    const startOfDay = dayjs().startOf('day').toISOString()
    const endOfDay = dayjs().endOf('day').toISOString()
    const getTimeQuery = await sqlReaderUtil.getFileContentAsString(
      'getStatusBarDetails.sql',
    )
    return this.knex.raw(getTimeQuery, { startOfDay, endOfDay })
  }

  async getLatestPulses(): Promise<CodeClimbers.Pulse[] | undefined> {
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
      .orderBy('created_at', 'desc')
      .limit(10)
    return res
  }

  async getAllPulses(): Promise<CodeClimbers.Pulse[] | undefined> {
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName).orderBy(
      'created_at',
      'desc',
    )
    return res
  }

  getMinutesInRangeQuery(startDate: Date, endDate: Date) {
    return this.knex<MinutesQuery[]>(this.tableName)
      .select(this.knex.raw('count(*) * 2 as minutes'))
      .from(this.tableName)
      .whereBetween('time', [startDate.toISOString(), endDate.toISOString()])
      .groupBy(this.knex.raw("strftime('%s', time) / 120"))
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
      .select(this.knex.raw('count(*) * 2 as minutes'))
      .first()
      .from('getMinutes')

    return result.minutes
  }

  async getCategoryTimeOverview(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.TimeOverview[]> {
    const query = this.knex<MinutesQuery[]>(this.tableName)
      .select(this.knex.raw('category, count(*) * 2'))
      .from(this.tableName)
      .whereBetween('time', [startDate, endDate])
      .groupBy(this.knex.raw("strftime('%s', time) / 120"))

    return await this.knex<CodeClimbers.TimeOverviewDao[]>(this.tableName)
      .with('getMinutes', query)
      .select(this.knex.raw('category, count() * 2 as minutes'))
      .groupBy('category')
      .from('getMinutes')
  }

  async createPulse(pulse: CodeClimbers.Pulse) {
    Logger.log('Creating pulse', 'pulse.repo')
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
      .insert(pulse)
      .returning('*')

    return res
  }

  async createPulses(pulses: CodeClimbers.Pulse[]) {
    Logger.log('Creating pulses', 'pulse.repo')
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
      .insert(pulses)
      .returning('*')
    Logger.log(`created ${pulses.length} pulses`, 'pulse.repo')
    return res
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUniqueUserAgentsAndLastActive(): Promise<any[]> {
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
      .select('user_agent', this.knex.raw('MAX(created_at) as last_active'))
      .groupBy('user_agent')
      .orderBy('last_active', 'desc')
    return res
  }

  async getLatestProject(): Promise<string | undefined> {
    const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
      .select('project')
      .whereNotNull('project')
      .whereNotIn('project', ['', '<<LAST_PROJECT>>'])
      .andWhere('time', '<', "datetime('now', '-15 minutes')")
      .orderBy('time', 'desc')
      .first()

    return await res?.project
  }

  async getPerProjectTimeOverview(
    category: string,
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.PerProjectTimeOverview[]> {
    const query = this.knex<MinutesQuery[]>(this.tableName)
      .select(this.knex.raw('project, count(*) * 2'))
      .from(this.tableName)
      .whereBetween('time', [startDate, endDate])
      .where('category', category)
      .groupBy('project', this.knex.raw("strftime('%s', time) / 120"))

    return await this.knex<CodeClimbers.PerProjectTimeOverviewDao[]>(
      this.tableName,
    )
      .with('getMinutes', query)
      .select(this.knex.raw('project as name, count() * 2 as minutes'))
      .groupBy('project')
      .from('getMinutes')
  }
}
