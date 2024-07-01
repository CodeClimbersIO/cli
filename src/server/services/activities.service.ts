//TODO:
// setup standard for types that represent api calls.

import { CodeClimbersApi } from '../../api.types/wakatimePulse.dto'
import pulseRepo from '../repos/pulse.repo'
import validationUtil from '../utils/validation.util'

const createPulse = async (pulseBody: CodeClimbers.Body) => {
  // process the pulse
  const dto = await validationUtil.validateBodyObject(
    pulseBody,
    CodeClimbersApi.CreateWakatimePulseDto,
  )
  const pulse: CodeClimbers.Pulse = mapDtoToPulse(dto)
  return pulseRepo.createPulse(pulse)
}

const createPulses = async (pulseBody: CodeClimbers.Body[]) => {
  const dtos = await validationUtil.validateBodyArray(
    pulseBody,
    CodeClimbersApi.CreateWakatimePulseDto,
  )
  const pulses: CodeClimbers.Pulse[] = dtos.map(mapDtoToPulse)
  return pulseRepo.createPulses(pulses)
}

const mapDtoToPulse = (
  dto: CodeClimbersApi.CreateWakatimePulseDto,
): CodeClimbers.Pulse => {
  return {
    userId: dto.userId,
    project: dto.project,
    branch: dto.branch,
    id: 0,
    entity: '',
    type: '',
    isWrite: false,
    editor: '',
    operatingSystem: '',
    machine: '',
    userAgent: '',
    time: '',
    hash: '',
    createdAt: '',
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
