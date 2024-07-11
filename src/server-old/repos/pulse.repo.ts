import { db } from '../db/knex'
import AppLogger from '../utils/appLogger.util'
import sqlReaderUtil from '../utils/sqlReader.util'

const tableName = 'activities_pulse'
const pulseDb = db<CodeClimbers.Pulse>(tableName)

const getStatusBarDetails = async (): Promise<
  CodeClimbers.WakatimePulseStatusDao[]
> => {
  const getTimeQuery = await sqlReaderUtil.getFileContentAsString(
    'getStatusBarDetails.sql',
  )
  return db.raw(getTimeQuery)
}
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
  AppLogger.info(`[pulse.repo]: created ${pulses.length} pulses`)
  return res
}

export default {
  getStatusBarDetails,
  getLatestPulses,
  createPulse,
  createPulses,
}
