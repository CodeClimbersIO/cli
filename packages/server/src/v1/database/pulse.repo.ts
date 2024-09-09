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
      .select('category', this.knex.raw('count(*) * 2 as minutes'))
      .from(this.tableName)
      .whereBetween('time', [startDate.toISOString(), endDate.toISOString()])
      .groupBy(['category', this.knex.raw("strftime('%s', time) / 120")])
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
    const startDateParsed = new Date(startDate)
    const endDateParsed = new Date(endDate)
    return this.knex<CodeClimbers.TimeOverviewDao[]>(this.tableName)
      .with(
        'getMinutes',
        this.getMinutesInRangeQuery(startDateParsed, endDateParsed),
      )
      .select(this.knex.raw('category, count() * 2 as minutes'))
      .groupBy('category')
      .from('getMinutes')
  }

  async createPulse(pulse: CodeClimbers.Pulse) {
    try {
      Logger.log('Creating pulse', 'pulse.repo')
      const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
        .insert(pulse)
        .returning('*')
      return res
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT') {
        Logger.error('Duplicate pulse', 'pulse.repo')
      } else {
        throw e
      }
    }
  }

  async createPulses(pulses: CodeClimbers.Pulse[]) {
    try {
      Logger.log('Creating pulses', 'pulse.repo')
      const res = await this.knex<CodeClimbers.Pulse>(this.tableName)
        .insert(pulses)
        .returning('*')
      Logger.log(`created ${pulses.length} pulses`, 'pulse.repo')
      return res
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT') {
        Logger.error('Duplicate pulse', 'pulse.repo')
      } else {
        throw e
      }
    }
  }

  async getDeepWork(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.DeepWorkTime[]> {
    const getLongestDayMinutesQuery =
      await sqlReaderUtil.getFileContentAsString('getDeepWork.sql')
    const result = await this.knex.raw<CodeClimbers.DeepWorkTime[]>(
      getLongestDayMinutesQuery,
      {
        startDate: startDate,
        endDate: endDate,
      },
    )
    return result
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

  async getSourcesMinutes(
    startDate: string,
    endDate: string,
  ): Promise<object | undefined> {
    const sources = [
      'vscode',
      'postman',
      'slack',
      'chrome',
      'microsoftOutlook',
      'safari',
      'linear',
      'notion',
      'jetbrainsrider',
      'jetbrainswebstorm',
      'microsoftTeams',
      'arc',
      'zoom',
    ]

    return await this.knex(this.tableName)
      .with(
        'getSourceMinutes',
        this.knex(this.tableName)
          .select({
            userAgent: 'user_agent',
            totalMinutes: this.knex.raw('count(*)'),
          })
          .from(this.tableName)
          .whereBetween('time', [startDate, endDate])
          .groupBy(['user_agent', this.knex.raw("strftime('%s', time) / 60")])
          .orderBy('user_agent'),
      )
      .select(
        sources.map((source) => ({
          [source]: this.knex.raw(
            `count(*) filter (where user_agent like '%${source}%')`,
          ),
        })),
      )
      .from('getSourceMinutes')
      .first()
  }

  async getSitesMinutes(
    startDate: string,
    endDate: string,
  ): Promise<object | undefined> {
    const sites = [
      'localhost',
      'figma',
      'canva',
      'linkedin',
      'youtube',
      'github',
      'email',
    ]

    return await this.knex(this.tableName)
      .with(
        'getSiteMinutes',
        this.knex(this.tableName)
          .select({
            entity: 'entity',
            totalMinutes: this.knex.raw('count(*)'),
          })
          .from(this.tableName)
          .whereBetween('time', [startDate, endDate])
          .andWhereLike('user_agent', '%chrome%')
          .orWhereLike('user_agent', '%safari%')
          .orWhereLike('user_agent', '%firefox%')
          .groupBy([this.knex.raw("strftime('%s', time) / 60"), 'entity']),
      )
      .select(
        sites.map((site) => ({
          [site]: this.knex.raw(
            `count(*) filter (where entity like '%${site}%')`,
          ),
        })),
      )
      .from('getSiteMinutes')
      .first()
  }
}
