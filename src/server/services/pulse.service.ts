import pulseRepo from '../repos/pulse.repo'

const getLatestPulses = async (): Promise<CodeClimbers.Pulse[] | undefined> => {
  return pulseRepo.getLatestPulses()
}

export default {
  getLatestPulses,
}
