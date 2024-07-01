import { db } from '../db/knex'

const tableName = 'activities_pulse'
const pulseDb = db<CodeClimbers.Pulse>(tableName)

const getLatestPulses = async (): Promise<
  CodeClimbersApi.PulseDao[] | undefined
> => {
  const res = await pulseDb.orderBy('created_at', 'desc').limit(10)
  return res
}

const createPulse = async (pulse: CodeClimbers.Pulse) => {
  const res = await pulseDb.insert(pulse)
  return res
}

const createPulses = async (pulses: CodeClimbers.Pulse[]) => {
  const res = await pulseDb.insert(pulses)
  return res
}

export default {
  getLatestPulses,
  createPulse,
  createPulses,
}
