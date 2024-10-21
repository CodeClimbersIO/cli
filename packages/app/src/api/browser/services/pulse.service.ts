import { Dayjs } from 'dayjs'
import {
  getDeepWork,
  getTimeByCategoryAndRange,
  getTimeByProjectCategoryAndRange,
} from '../repos/pulse.repo'
import { sqlQueryFn } from './query.service'

const getDeepWorkBetweenDates = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.DeepWorkPeriod[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const deepWorkSql = getDeepWork(startDate, endDate)

  const records: CodeClimbers.DeepWorkTime[] = await sqlQueryFn(
    deepWorkSql,
    'getDeepWorkBetweenDates',
  )

  const periods: CodeClimbers.DeepWorkPeriod[] = []
  let currentPeriod: CodeClimbers.DeepWorkPeriod | null = null

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

const getProjectsTimeByRangeAndCategory = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.PerProjectTimeAndCategoryOverview> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const projectsTimeSql = getTimeByProjectCategoryAndRange(startDate, endDate)

  const records: CodeClimbers.PerProjectTimeAndCategoryOverviewDB[] =
    await sqlQueryFn(projectsTimeSql, 'getProjectsTimeByRangeAndCategory')

  return records.reduce((acc, row) => {
    if (!acc[row.category]) {
      acc[row.category] = []
    }

    acc[row.category].push({ name: row.name, minutes: row.minutes })

    return acc
  }, {} as CodeClimbers.PerProjectTimeAndCategoryOverview)
}

const getCategoryTimeByRange = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.CategoryTimeOverviewDB[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const categoryTimeSql = getTimeByCategoryAndRange(startDate, endDate)

  const records: CodeClimbers.CategoryTimeOverviewDB[] = await sqlQueryFn(
    categoryTimeSql,
    'getCategoryTimeByRange',
  )

  // merge category 'communication' with 'communicating'
  const mergedRecords = records
    .map((row) => {
      if (row.category === 'communication') {
        return { ...row, category: 'communicating' }
      }
      return row
    })
    .reduce((acc, row) => {
      const existingCategory = acc.find((c) => c.category === row.category)
      if (existingCategory) {
        existingCategory.minutes += row.minutes
      } else {
        acc.push(row)
      }
      return acc
    }, [] as CodeClimbers.CategoryTimeOverviewDB[])

  return mergedRecords
}

const getTotalTimeByRange = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<number> => {
  const timeRecords = await getCategoryTimeByRange(
    selectedStartDate,
    selectedEndDate,
  )
  return timeRecords.reduce((acc, row) => acc + row.minutes, 0)
}

export {
  getDeepWorkBetweenDates,
  getProjectsTimeByRangeAndCategory,
  getCategoryTimeByRange,
  getTotalTimeByRange,
}
