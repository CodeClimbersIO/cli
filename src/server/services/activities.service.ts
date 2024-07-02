import { CodeClimbersApi } from '../../api.types/wakatimePulse.dto'
import pulseRepo from '../repos/pulse.repo'
import activitiesUtil from '../utils/activities.util'
import AppLogger from '../utils/appLogger.util'
import validationUtil from '../utils/validation.util'

const createPulse = async (pulseBody: CodeClimbers.Body) => {
  // process the pulse
  const dto = await validationUtil.validateBodyObject(
    pulseBody,
    CodeClimbersApi.CreateWakatimePulseDto,
  )
  const pulse: CodeClimbers.Pulse = mapDtoToPulse(dto)
  await pulseRepo.createPulse(pulse)
  return activitiesUtil.pulseSuccessResponse(1)
}

const createPulses = async (pulseBody: CodeClimbers.Body[]) => {
  AppLogger.info(JSON.stringify(pulseBody))
  const dtos = await validationUtil.validateBodyArray(
    pulseBody,
    CodeClimbersApi.CreateWakatimePulseDto,
  )
  const pulses: CodeClimbers.Pulse[] = dtos.map(mapDtoToPulse)
  const uniquePulses = activitiesUtil.filterUniqueByHash(pulses)

  await pulseRepo.createPulses(uniquePulses)
  return activitiesUtil.pulseSuccessResponse(pulseBody.length)
}

const mapDtoToPulse = (
  dto: CodeClimbersApi.CreateWakatimePulseDto,
): CodeClimbers.Pulse => {
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
const getLatestPulses = async (): Promise<CodeClimbers.Pulse[] | undefined> => {
  return pulseRepo.getLatestPulses()
}

export default {
  getLatestPulses,
  createPulse,
  createPulses,
}
