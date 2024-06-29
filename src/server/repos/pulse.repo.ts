import { db } from '../db/knex'

const tableName = 'activities_pulse'
const pulseDb = db<CodeClimbers.Pulse>(tableName)

const getLatestPulses = async (): Promise<CodeClimbersApi.PulseDao[] | undefined> => {
  const res = await pulseDb.orderBy('created_at', 'desc').limit(10)
  return res
}

export default {
  getLatestPulses,
}
