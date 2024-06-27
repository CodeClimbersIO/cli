import pulseRepo from '../repos/pulse.repo'

const getLatestPulse = async (): Promise<CodeClimbers.Pulse | undefined> => {
  return pulseRepo.getLatestPulse()
}

export default {
  getLatestPulse,
}
