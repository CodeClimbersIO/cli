import { Dayjs } from 'dayjs'
import {
  getDeepWork,
  getTimeByCategoryAndRange,
  getTimeByEntityAndRange,
  getTimeByProjectAndRange,
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

const getProjectsTimeByRange = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.PerProjectTimeOverviewDB[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const projectsTimeSql = getTimeByProjectAndRange(startDate, endDate)

  const records: CodeClimbers.PerProjectTimeOverviewDB[] = await sqlQueryFn(
    projectsTimeSql,
    'getProjectsTimeByRange',
  )
  return records
}

const getSocialMediaTimeByRange = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.EntityTimeOverviewDB[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const entityTimeSql = getTimeByEntityAndRange(startDate, endDate)

  const records: CodeClimbers.EntityTimeOverviewDB[] = await sqlQueryFn(
    entityTimeSql,
    'getSocialMediaTimeByRange',
  )

  const sites = [
    'facebook',
    'instagram',
    'twitter',
    'linkedin',
    'tiktok',
    'snapchat',
    'youtube',
    'twitch',
    'pinterest',
  ]

  const socialMediaTimes = records.filter((row) =>
    sites.includes(row.entity.toLowerCase()),
  )
  return socialMediaTimes
}

const getMasteryAndGrowthByRange = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<CodeClimbers.EntityTimeOverviewDB[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()
  console.log('growth')
  const entityTimeSql = getTimeByEntityAndRange(startDate, endDate)

  const records: CodeClimbers.EntityTimeOverviewDB[] = await sqlQueryFn(
    entityTimeSql,
    'getMasteryAndGrowthByRange',
  )

  const sites = [
    'mozilla',
    'stackoverflow',
    'devdocs',
    'coursera',
    'udemy',
    'codeacademy',
    'theodinproject',
    'freecodecamp',
    'daily.dev',
    'dev.to',
    'hackernews',
    'leetcode',
    'hackerank',
  ]

  const growthSites = records.filter((row) =>
    sites.includes(row.entity.toLowerCase()),
  )
  return growthSites
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
  getSocialMediaTimeByRange,
  getCategoryTimeByRange,
  getTotalTimeByRange,
  getProjectsTimeByRange,
  getMasteryAndGrowthByRange,
}
