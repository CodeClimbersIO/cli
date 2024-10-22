import { Injectable, Logger } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'
import dayjs from 'dayjs'
import { PageOptionsDto } from '../dtos/pagination.dto'
import { getFileContentAsString } from '../../../utils/sqlReader.util'

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
    const getTimeQuery = await getFileContentAsString('getStatusBarDetails.sql')
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
      .select('category')
      .from(this.tableName)
      .whereBetween('time', [startDate.toISOString(), endDate.toISOString()])
      .groupBy(['category', this.knex.raw("strftime('%s', time) / 120")])
  }

  async getLongestDayInRangeMinutes(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    const getLongestDayMinutesQuery = await getFileContentAsString(
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
      await getFileContentAsString('getDeepWork.sql')
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
      'webstorm',
      'intellij',
      'pycharm',
      'microsoftTeams',
      'arc',
      'zoom',
    ]

    const query = this.knex(this.tableName)
      .with(
        'getSourceMinutes',
        this.knex(this.tableName)
          .select({
            userAgent: 'user_agent',
            totalMinutes: this.knex.raw('count(*)'),
          })
          .from(this.tableName)
          .whereBetween('time', [startDate, endDate])
          .groupBy(['user_agent', this.knex.raw("strftime('%s', time) / 120")])
          .orderBy('user_agent'),
      )
      .select(
        sources.map((source) => ({
          [source]: this.knex.raw(
            `count(*) filter (where user_agent like '%${source}%') * 2`,
          ),
        })),
      )
      .from('getSourceMinutes')
      .first()

    return query
  }

  async getSitesMinutes(
    startDate: string,
    endDate: string,
  ): Promise<object | undefined> {
    const sites = [
      'github',
      'figma',
      'canva',
      'slack',
      'mail.google',
      'stackoverflow',
      'claudeai',
      'chatgpt',
      'outlook',
      'linear',
      'jira',
      'linkedin',
      'youtube',
      'localhost',
    ]

    return this.knex(this.tableName)
      .with(
        'getSiteMinutes',
        this.knex(this.tableName)
          .select({
            entity: 'entity',
            minutes: this.knex.raw('count(*)'),
          })
          .from(this.tableName)
          .whereBetween('time', [startDate, endDate])
          .andWhere('type', 'domain')
          .groupBy([this.knex.raw("strftime('%s', time) / 120"), 'entity']),
      )
      .select(
        sites.map((site) => ({
          [site]: this.knex.raw(
            `count(*) filter (where entity like '%${site}%') * 2`,
          ),
        })),
      )
      .from('getSiteMinutes')
      .first()
  }

  async getPerProjectOverviewTopThree(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.PerProjectTimeAndCategoryOverview> {
    const baseQuery = this.knex<MinutesQuery[]>(this.tableName)
      .select(this.knex.raw('category, project, count(*) * 2'))
      .from(this.tableName)
      .whereBetween('time', [startDate, endDate])
      .groupBy(
        'category',
        'project',
        this.knex.raw("strftime('%s', time) / 120"),
      )

    const results = await this.knex<CodeClimbers.ProjectTimeOverview[]>(
      this.tableName,
    )
      .with('getMinutes', baseQuery)
      .select('category')
      .select(this.knex.raw('project as name, count() * 2 as minutes'))
      .groupBy('category', 'project')
      .orderBy('category')
      .orderBy('minutes', 'desc')
      .limit(3)
      .from('getMinutes')

    return results.reduce((acc, row) => {
      if (!acc[row.category]) {
        acc[row.category] = []
      }

      acc[row.category].push({ name: row.name, minutes: row.minutes })

      return acc
    }, {} as CodeClimbers.PerProjectTimeAndCategoryOverview)
  }

  async getPerProjectOverviewByCategory(
    startDate: string,
    endDate: string,
    category: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<CodeClimbers.ProjectTimeOverview[]> {
    const pageSize = pageOptionsDto.limit ?? 3
    const offset = (pageOptionsDto.page - 1) * pageSize

    const query = this.knex<MinutesQuery[]>(this.tableName)
      .select(this.knex.raw('project, count(*) * 2'))
      .from(this.tableName)
      .whereBetween('time', [startDate, endDate])
      .where('category', category)
      .groupBy('project', this.knex.raw("strftime('%s', time) / 120"))

    return this.knex<CodeClimbers.ProjectTimeOverview[]>(this.tableName)
      .with('getMinutes', query)
      .select(this.knex.raw('project as name, count() * 2 as minutes'))
      .groupBy('project')
      .orderBy('minutes', pageOptionsDto.sort)
      .offset(offset)
      .limit(pageSize)
      .from('getMinutes')
  }

  getTimeByProjectCategoryAndRange = async (
    startDate: string,
    endDate: string,
  ) => {
    const query = `
  with get_minutes as 
  (
    select category, project from activities_pulse 
    where time between '${startDate}' and '${endDate}' 
    group by category, project, strftime('%s', time) / 120
  ) 
  select category, project as name, count() * 2 as minutes 
    from get_minutes 
    group by category, project 
    order by category asc, minutes desc 
  `
    const result = await this.knex.raw<
      CodeClimbers.PerProjectTimeAndCategoryOverviewDB[]
    >(query, {
      startDate: startDate,
      endDate: endDate,
    })
    return result
  }

  getTimeByProjectAndRange = async (startDate: string, endDate: string) => {
    const query = `
  with get_minutes as 
  (
    select project from activities_pulse 
    where time between '${startDate}' and '${endDate}' 
    and category = 'coding'
    group by  project, strftime('%s', time) / 120
  ) 
  select project as name, count() * 2 as minutes 
    from get_minutes 
    group by project 
    order by minutes desc 
  `
    const result = await this.knex.raw<CodeClimbers.PerProjectTimeOverviewDB[]>(
      query,
      {
        startDate: startDate,
        endDate: endDate,
      },
    )
    return result
  }

  getTimeByEntityAndRange = async (startDate: string, endDate: string) => {
    const query = `
  with get_minutes as 
  (
    select entity from activities_pulse 
    where time between '${startDate}' and '${endDate}' 
    group by entity, strftime('%s', time) / 120
  ) 
  select entity, count() * 2 as minutes 
    from get_minutes 
    group by entity 
    order by minutes desc 
  `
    const result = await this.knex.raw<CodeClimbers.EntityTimeOverviewDB[]>(
      query,
      {
        startDate: startDate,
        endDate: endDate,
      },
    )
    return result
  }

  getTimeByCategoryAndRange = async (startDate: string, endDate: string) => {
    const query = `
  with get_minutes as 
  (
    select category from activities_pulse 
    where time between '${startDate}' and '${endDate}' 
    group by category, strftime('%s', time) / 120
  ) 
  select category, count() * 2 as minutes 
    from get_minutes 
    group by category 
    order by category asc, minutes desc 
  `
    const result = await this.knex.raw<CodeClimbers.CategoryTimeOverviewDB[]>(
      query,
      {
        startDate: startDate,
        endDate: endDate,
      },
    )
    return result
  }
}
