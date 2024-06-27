import { db } from '../db/knex'

const tableName = 'activities_pulse'
const pulseDb = db<CodeClimbers.Pulse>(tableName)

const getLatestPulse = async (): Promise<CodeClimbers.Pulse | undefined> => {
  const res = await pulseDb.orderBy('created_at', 'desc').first()
  return res
}

export default {
  getLatestPulse,
}
