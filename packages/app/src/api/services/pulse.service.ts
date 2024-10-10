import { Dayjs } from 'dayjs'
import { getDeepWork, getTimeByProjectAndRange } from '../repos/pulse.repo'
import { sqlQueryFn } from './query.service'

interface DeepWorkPeriod {
  startDate: string
  endDate: string
  time: number
}

const getDeepWorkBetweenDates = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<DeepWorkPeriod[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const deepWorkSql = getDeepWork(startDate, endDate)

  const records: CodeClimbers.DeepWorkTime[] = await sqlQueryFn(
    deepWorkSql,
    'getDeepWorkBetweenDates',
  )

  const periods: DeepWorkPeriod[] = []
  let currentPeriod: DeepWorkPeriod | null = null

  const isSameDay = (date1: string, date2: string) => {
    return new Date(date1).toDateString() === new Date(date2).toDateString()
  }

  records.forEach((item) => {
    if (currentPeriod && isSameDay(currentPeriod.startDate, item.flowStart)) {
      currentPeriod.endDate = item.flowStart
      currentPeriod.time += item.flowTime
    } else {
      if (currentPeriod) {
        periods.push(currentPeriod)
      }
      currentPeriod = {
        startDate: item.flowStart,
        endDate: item.flowStart,
        time: item.flowTime,
      }
    }
  })

  if (currentPeriod) {
    periods.push(currentPeriod)
  }

  return periods
}

const getProjectsTimeByRange = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.PerProjectTimeOverview> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const projectsTimeSql = getTimeByProjectAndRange(startDate, endDate)

  const records: CodeClimbers.PerProjectTimeOverviewDB[] = await sqlQueryFn(
    projectsTimeSql,
    'getProjectsTimeByRange',
  )
  console.log(records)
  return records.reduce((acc, row) => {
    if (!acc[row.category]) {
      acc[row.category] = []
    }

    acc[row.category].push({ name: row.name, minutes: row.minutes })

    return acc
  }, {} as CodeClimbers.PerProjectTimeOverview)
}

export { getDeepWorkBetweenDates, getProjectsTimeByRange }
