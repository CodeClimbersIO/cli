import { Injectable, Logger } from '@nestjs/common'
import activitiesUtil from '../../utils/activities.util'
import { CreateWakatimePulseDto } from './dtos/createWakatimePulse.dto'
import { PulseRepo } from '../db/pulse.repo'

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
    Logger.log(JSON.stringify(pulsesDto))
    const pulses: CodeClimbers.Pulse[] = pulsesDto.map(this.mapDtoToPulse)
    const uniquePulses = activitiesUtil.filterUniqueByHash(pulses)

    await this.pulseRepo.createPulses(uniquePulses)
    return activitiesUtil.pulseSuccessResponse(pulsesDto.length)
  }

  async getLatestPulses(): Promise<CodeClimbers.Pulse[] | undefined> {
    return this.pulseRepo.getLatestPulses()
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
      time: new Date((dto.time as number) * 1000).toISOString(),
      hash: `${activitiesUtil.calculatePulseHash(dto)}`,
      origin: dto.origin || '',
      originId: dto.origin_id || '',
      category: dto.category || '',
      createdAt: new Date().toISOString(),
    }
  }
}
