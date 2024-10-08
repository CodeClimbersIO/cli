import { deepWorkSql } from './queries/deepWork.query'

const getLatestPulses = () => {
  // Example query
  const query = `
    SELECT *
    FROM activities_pulse
    ORDER BY id DESC
    LIMIT 10
  `
  return query
}

const getAllPulses = () => {
  const query = `
    SELECT *
    FROM activities_pulse
    ORDER BY created_at DESC
  `
  return query
}

const getDeepWork = (startDate: string, endDate: string) => {
  const query = deepWorkSql(startDate, endDate)
  return query
}

export default {
  getAllPulses,
  getLatestPulses,
  getDeepWork,
}
