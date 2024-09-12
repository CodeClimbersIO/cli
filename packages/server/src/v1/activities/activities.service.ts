import { Injectable } from '@nestjs/common'
import { CreateWakatimePulseDto } from '../dtos/createWakatimePulse.dto'
import activitiesUtil from '../../../utils/activities.util'
import { PulseRepo } from '../database/pulse.repo'
import os from 'node:os'
import dayjs from 'dayjs'
import { TimePeriodDto } from '../dtos/getCategoryTimeOverview.dto'
import { PageDto, PageMetaDto, PageOptionsDto } from '../dtos/pagination.dto'

@Injectable()
export class ActivitiesService {
  constructor(private readonly pulseRepo: PulseRepo) {
    this.pulseRepo = pulseRepo
  }
  async getActivityStatusBar(): Promise<CodeClimbers.ActivitiesStatusBar> {
    const statusBarRaw = await this.pulseRepo.getStatusBarDetails()
    // these next 5 lines to get the dayTotalMinutes are all that is shown in the status bar in vscode and the other plugins but the statusBar details are needed to be returned so that the extensions don't error
    const startDate = dayjs().startOf('day').toISOString()
    const endDate = dayjs().endOf('day').toISOString()
    const data = await this.pulseRepo.getCategoryTimeOverview(
      startDate,
      endDate,
    )
    const dayTotalMinutes = data.reduce((acc, curr) => acc + curr.minutes, 0)
    return activitiesUtil.mapStatusBarRawToDto(statusBarRaw, dayTotalMinutes)
  }
  // process the pulse
  async createPulse(pulseDto: CreateWakatimePulseDto) {
    const latestProject = await this.pulseRepo.getLatestProject()
    const pulse: CodeClimbers.Pulse = this.mapDtoToPulse(
      pulseDto,
      latestProject,
    )
    await this.pulseRepo.createPulse(pulse)
    return activitiesUtil.pulseSuccessResponse(1)
  }

  async createPulses(pulsesDto: CreateWakatimePulseDto[]) {
    const latestProject = await this.pulseRepo.getLatestProject()
    const pulses: CodeClimbers.Pulse[] = pulsesDto.map((dto) =>
      this.mapDtoToPulse(dto, latestProject),
    )
    const uniquePulses = activitiesUtil.filterUniqueByHash(pulses)

    await this.pulseRepo.createPulses(uniquePulses)
    return activitiesUtil.pulseSuccessResponse(pulsesDto.length)
  }

  async getLatestPulses(): Promise<CodeClimbers.Pulse[] | undefined> {
    return this.pulseRepo.getLatestPulses()
  }

  async getCategoryTimeOverview(
    periods: TimePeriodDto[],
  ): Promise<CodeClimbers.TimeOverview[][]> {
    const resultsPromises = periods.map((period) => {
      if (!period.startDate || !period.endDate) {
        throw new Error('Invalid time period')
      }
      return this.pulseRepo.getCategoryTimeOverview(
        period.startDate,
        period.endDate,
      )
    })
    const results = await Promise.all(resultsPromises)
    return results
  }

  async getWeekOverview(date: string): Promise<CodeClimbers.WeekOverview> {
    const currentDate = new Date(date)
    const weekStart = new Date(
      new Date(currentDate).setDate(currentDate.getDate() - 7),
    )

    const tomorrow = new Date(new Date(date).setDate(currentDate.getDate() + 1))

    const yesterday = new Date(
      new Date(date).setDate(currentDate.getDate() - 1),
    )

    const longestDayMinutes = await this.pulseRepo.getLongestDayInRangeMinutes(
      weekStart,
      currentDate,
    )
    const yesterdayMinutes = await this.pulseRepo.getRangeMinutes(
      yesterday,
      currentDate,
    )
    const todayMinutes = await this.pulseRepo.getRangeMinutes(
      currentDate,
      tomorrow,
    )
    const weekMinutes = await this.pulseRepo.getRangeMinutes(
      weekStart,
      currentDate,
    )

    return {
      longestDayMinutes,
      yesterdayMinutes,
      todayMinutes,
      weekMinutes,
    }
  }

  async getSources(): Promise<CodeClimbers.Source[]> {
    const userAgentsAndLastActive =
      await this.pulseRepo.getUniqueUserAgentsAndLastActive()
    const sources = new Set<string>()

    userAgentsAndLastActive.forEach((userAgent) => {
      const source = activitiesUtil.getSourceFromUserAgent(userAgent.userAgent)
      if (source) {
        sources.add(source)
      }
    })

    return Array.from(sources).map((source) => {
      const maxLastActive = userAgentsAndLastActive
        .filter((userAgent) => {
          return (
            source ===
            activitiesUtil.getSourceFromUserAgent(userAgent.userAgent)
          )
        })
        .reduce((max, userAgent) => {
          return new Date(userAgent.lastActive) > new Date(max)
            ? userAgent.lastActive
            : max
        }, new Date(0).toISOString())

      return { name: source, lastActive: maxLastActive }
    })
  }

  async getSourcesMinutes(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.SourceMinutes[]> {
    const userSources = await this.getSources()
    const sourcesWithMinutes = await this.pulseRepo.getSourcesMinutes(
      startDate,
      endDate,
    )

    return Object.keys(sourcesWithMinutes)
      .map((key) => {
        const lastActive =
          userSources.find((source) =>
            source.name.toLowerCase().includes(key.toLowerCase()),
          )?.lastActive ?? null

        if (lastActive === null) return null

        return {
          name: key,
          minutes: sourcesWithMinutes[key],
          lastActive,
        }
      })
      .filter((item) => item !== null)
  }

  async getSitesMinutes(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.SiteMinutes[]> {
    const sitesWithMinutes = await this.pulseRepo.getSitesMinutes(
      startDate,
      endDate,
    )

    return Object.keys(sitesWithMinutes)
      .map((key) => {
        const value = sitesWithMinutes[key]
        if (value === 0) return null

        return {
          name: key,
          minutes: value * 2,
        }
      })
      .filter((item) => item !== null)
  }

  async getDeepWork(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.DeepWorkTime[]> {
    return this.pulseRepo.getDeepWork(startDate, endDate)
  }

  async generatePulsesCSV(): Promise<Buffer> {
    const pulses = await this.pulseRepo.getAllPulses()
    const csvString = this.convertPulsesToCSV(pulses)
    return Buffer.from(csvString, 'utf-8')
  }

  private userAgent() {
    const platform = os.platform()
    const release = os.release()
    const arch = os.arch()
    const nodeVersion = process.version

    return `Node/${nodeVersion.slice(1)} (${platform}; ${arch}) OS/${release}`
  }

  private mapDtoToPulse(
    dto: CreateWakatimePulseDto,
    latestProject?: string,
  ): CodeClimbers.Pulse {
    const project =
      (dto.project === '<<PROJECT>>' || !dto.project) && latestProject
        ? latestProject
        : dto.project

    return {
      userId: 'local',
      project,
      branch: dto.branch,
      entity: dto.entity,
      type: dto.type,
      isWrite: dto.is_write || false,
      editor: dto.editor || '',
      language: dto.language || Intl.DateTimeFormat().resolvedOptions().locale,
      operatingSystem: dto.operating_system || os.platform(),
      machine: dto.machine || os.hostname(),
      userAgent: dto.user_agent || this.userAgent(),
      time: dayjs((dto.time as number) * 1000).toISOString(),
      hash: `${activitiesUtil.calculatePulseHash(dto)}`,
      origin: dto.origin || '',
      originId: dto.origin_id || '',
      category: dto.category || '',
      createdAt: dayjs().toISOString(),
    }
  }

  private convertPulsesToCSV(pulses: CodeClimbers.Pulse[]): string {
    const header = [
      'ID',
      'User ID',
      'Entity',
      'Type',
      'Category',
      'Project',
      'Branch',
      'Language',
      'Is Write',
      'Editor',
      'Operating System',
      'Machine',
      'User Agent',
      'Time',
      'Hash',
      'Origin',
      'Origin ID',
      'Created At',
      'Description',
    ].join(',')

    const rows = pulses.map((row) =>
      [
        row.id,
        row.userId,
        row.entity,
        row.type,
        row.category,
        row.project,
        row.branch,
        row.language,
        row.isWrite,
        row.editor,
        row.operatingSystem,
        row.machine,
        row.userAgent,
        row.time,
        row.hash,
        row.origin,
        row.originId,
        row.createdAt,
        row.description,
      ]
        .map((value) => (value === null ? '' : value.toString()))
        .join(','),
    )

    return [header, ...rows].join('\n')
  }

  async getPerProjectOverviewTopThree(
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.PerProjectTimeOverview[]> {
    return await this.pulseRepo.getPerProjectOverviewTopThree(
      startDate,
      endDate,
    )
  }

  async getPerProjectOverviewByCategory(
    startDate: string,
    endDate: string,
    category: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CodeClimbers.ProjectTimeOverview>> {
    const results = await this.pulseRepo.getPerProjectOverviewByCategory(
      startDate,
      endDate,
      category,
      pageOptionsDto,
    )
    const count = results.length
    const pageMetaDto = new PageMetaDto({ count, pageOptionsDto })

    return new PageDto(results, pageMetaDto)
  }
}
