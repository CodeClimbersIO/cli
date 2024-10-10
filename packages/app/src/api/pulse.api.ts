import { Dayjs } from 'dayjs'
import { useBetterQuery } from '../services'
import { pulseKeys } from './keys'
import {
  getCategoryTimeByRange,
  getDeepWorkBetweenDates,
  getProjectsTimeByRange,
  getSocialMediaTimeByRange,
  getTotalTimeByRange,
} from './services/pulse.service'

interface DeepWorkPeriod {
  startDate: string
  endDate: string
  time: number
}

const useDeepWorkV2 = (selectedStartDate: Dayjs, selectedEndDate: Dayjs) => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const queryFn = () =>
    getDeepWorkBetweenDates(selectedStartDate, selectedEndDate)

  return useBetterQuery<DeepWorkPeriod[], Error>({
    queryKey: pulseKeys.deepWork(startDate, endDate),
    queryFn,
    enabled: !!selectedStartDate && !!selectedEndDate,
  })
}

const useProjectsTimeByRange = (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
) => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const queryFn = () =>
    getProjectsTimeByRange(selectedStartDate, selectedEndDate)

  return useBetterQuery<CodeClimbers.PerProjectTimeOverview, Error>({
    queryKey: pulseKeys.projectsTimeByRange(startDate, endDate),
    queryFn,
    enabled: !!selectedStartDate && !!selectedEndDate,
  })
}

const useGetSocialMediaTimeByRange = (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
) => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const queryFn = () =>
    getSocialMediaTimeByRange(selectedStartDate, selectedEndDate)

  return useBetterQuery<CodeClimbers.EntityTimeOverviewDB[], Error>({
    queryKey: pulseKeys.socialMediaTimeByRange(startDate, endDate),
    queryFn,
    enabled: !!selectedStartDate && !!selectedEndDate,
  })
}

const useCategoryTimeByRange = (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
) => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const queryFn = () =>
    getCategoryTimeByRange(selectedStartDate, selectedEndDate)

  return useBetterQuery<CodeClimbers.CategoryTimeOverviewDB[], Error>({
    queryKey: pulseKeys.categoryTimeOverviewV2(startDate, endDate),
    queryFn,
    enabled: !!selectedStartDate && !!selectedEndDate,
  })
}

const useTotalTimeByRange = (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
) => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const queryFn = () => getTotalTimeByRange(selectedStartDate, selectedEndDate)

  return useBetterQuery<number, Error>({
    queryKey: pulseKeys.totalTimeByRange(startDate, endDate),
    queryFn,
    enabled: !!selectedStartDate && !!selectedEndDate,
  })
}
export {
  useDeepWorkV2,
  useProjectsTimeByRange,
  useGetSocialMediaTimeByRange,
  useCategoryTimeByRange,
  useTotalTimeByRange,
}
