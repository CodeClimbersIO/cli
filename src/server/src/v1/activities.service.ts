import { BadRequestException, Injectable } from '@nestjs/common'
import activitiesUtil from '../../utils/activities.util'
import { CreateWakatimePulseDto } from './dtos/createWakatimePulse.dto'
import { PulseRepo } from '../db/pulse.repo'
import { DateTime } from 'luxon'
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
    const pulse: CodeClimbers.Pulse = this.mapDtoToPulse(pulseDto)
    await this.pulseRepo.createPulse(pulse)
    return activitiesUtil.pulseSuccessResponse(1)
  }

  async createPulses(pulsesDto: CreateWakatimePulseDto[]) {
    const pulses: CodeClimbers.Pulse[] = pulsesDto.map(this.mapDtoToPulse)
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
  ): Promise<CodeClimbers.TimeOverviewDao[]> {
    if (
      new Date(startDate).toString() === 'Invalid Date' ||
      new Date(endDate).toString() === 'Invalid Date'
    ) {
      throw new BadRequestException('Start and End Date must be valid.')
    }

    return this.pulseRepo.getCategoryTimeOverview(startDate, endDate)
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

  private mapDtoToPulse(dto: CreateWakatimePulseDto): CodeClimbers.Pulse {
    return {
      userId: 'local',
      project: dto.project,
      branch: dto.branch,
      entity: dto.entity,
      type: dto.type,
      isWrite: dto.is_write || false,
      editor: dto.editor || '',
      operatingSystem: dto.operating_system || '',
      machine: dto.machine || '',
      userAgent: dto.user_agent || '',
      time: DateTime.fromMillis(dto.time as number).toISO(),
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
