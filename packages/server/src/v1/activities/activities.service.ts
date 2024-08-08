import { Injectable } from '@nestjs/common'
import { CreateWakatimePulseDto } from '../dtos/createWakatimePulse.dto'
import { DateTime } from 'luxon'
import activitiesUtil from '../../../utils/activities.util'
import { PulseRepo } from '../database/pulse.repo'
import * as os from 'node:os'

@Injectable()
export class ActivitiesService {
  constructor(private readonly pulseRepo: PulseRepo) {
    this.pulseRepo = pulseRepo
  }
  async getActivityStatusBar(): Promise<CodeClimbers.ActivitiesStatusBar> {
    const statusBarRaw = await this.pulseRepo.getStatusBarDetails()
    return activitiesUtil.mapStatusBarRawToDto(statusBarRaw)
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
    startDate: string,
    endDate: string,
  ): Promise<CodeClimbers.TimeOverview[]> {
    return await this.pulseRepo.getCategoryTimeOverview(startDate, endDate)
  }

  async getWeekOverview(date: string): Promise<CodeClimbers.WeekOverview> {
    const currentDate = new Date(date)
    const weekStart = new Date(
      new Date(currentDate).setDate(currentDate.getDate() - 7),
    )
    const yesterday = new Date(
      new Date(date).setDate(currentDate.getDate() - 1),
    )
    const twoDaysAgo = new Date(
      new Date(yesterday).setDate(yesterday.getDate() - 1),
    )

    const longestDayMinutes = await this.pulseRepo.getLongestDayInRangeMinutes(
      weekStart,
      currentDate,
    )
    const yesterdayMinutes = await this.pulseRepo.getRangeMinutes(
      twoDaysAgo,
      yesterday,
    )
    const todayMinutes = await this.pulseRepo.getRangeMinutes(
      yesterday,
      currentDate,
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
      time: DateTime.fromMillis((dto.time as number) * 1000).toISO(),
      hash: `${activitiesUtil.calculatePulseHash(dto)}`,
      origin: dto.origin || '',
      originId: dto.origin_id || '',
      category: dto.category || '',
      createdAt: DateTime.now().toISO(),
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
}
