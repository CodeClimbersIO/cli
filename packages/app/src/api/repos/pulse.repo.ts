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

const getTimeByProjectAndRange = (startDate: string, endDate: string) => {
  const query = `
  with get_minutes as 
  (
    select category, project from activities_pulse 
    where time between '${startDate}' and '${endDate}' 
    group by category, project, strftime('%s', time) / 120
  ) 
  select category, project as name, count() * 2 as minutes 
    from get_minutes 
    group by category, project 
    order by category asc, minutes desc 
  `
  return query
}

export { getAllPulses, getLatestPulses, getDeepWork, getTimeByProjectAndRange }
