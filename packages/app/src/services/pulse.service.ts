import { useCallback } from 'react'
import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'
import { pulseKeys } from './keys'
import { Dayjs } from 'dayjs'
import csvUtil from '../utils/csv.util'

export function useGetSources() {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/sources`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.Source[], Error>({
    queryKey: pulseKeys.sources,
    queryFn,
    refetchOnWindowFocus: true,
  })
}

export function useGetSourcesWithMinutes(startDate: string, endDate: string) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/sourcesMinutes?startDate=${startDate}&endDate=${endDate}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.SourceWithMinutes[], Error>({
    queryKey: pulseKeys.sourcesMinutes(startDate, endDate),
    queryFn,
    refetchOnWindowFocus: true,
  })
}

export function useGetSitesWithMinutes(startDate: string, endDate: string) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/sitesMinutes?startDate=${startDate}&endDate=${endDate}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.SiteWithMinutes[], Error>({
    queryKey: pulseKeys.sitesMinutes(startDate, endDate),
    queryFn,
    refetchOnWindowFocus: true,
  })
}

export const useExportPulses = () => {
  const exportPulses = useCallback(async () => {
    try {
      const response = await apiRequest({
        url: `${BASE_API_URL}/pulses/export`,
        method: 'GET',
        responseType: 'blob',
      })
      const blob = new Blob([response])
      csvUtil.downloadBlob(blob, 'pulses.csv')
    } catch (error) {
      console.error('Failed to export pulses:', error)
    }
  }, [])

  return { exportPulses }
}

export function useWeekOverview(date = '') {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/weekOverview?date=${date}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.WeekOverview, Error>({
    queryKey: pulseKeys.weekOverview(date),
    queryFn,
    enabled: !!date,
  })
}

export function useCategoryTimeOverview(selectedStartDate: Dayjs) {
  const todayStartDate = selectedStartDate?.startOf('day').toISOString()
  const todayEndDate = selectedStartDate?.endOf('day').toISOString()

  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/categoryTimeOverview`,
      method: 'POST',
      body: {
        periods: [{ startDate: todayStartDate, endDate: todayEndDate }],
      },
    })
  return useBetterQuery<CodeClimbers.TimeOverview[][], Error>({
    queryKey: pulseKeys.categoryTimeOverview(todayStartDate, todayEndDate),
    queryFn,
    enabled: !!todayStartDate && !!todayEndDate,
    select: (data) => {
      return data.map((day) =>
        day.map((activity) => {
          if (activity.category === 'communication') {
            return { ...activity, category: 'communicating' }
          }
          return activity
        }),
      )
    },
  })
}

export function useDeepWork(selectedStartDate: Dayjs) {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedStartDate?.endOf('day').toISOString()
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/deepwork?startDate=${startDate}&endDate=${endDate}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.DeepWorkTime[], Error>({
    queryKey: pulseKeys.deepWork(startDate, endDate),
    queryFn,
    enabled: !!startDate && !!endDate,
  })
}

export function usePerProjectOverviewTopThree(selectedStartDate: Dayjs) {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedStartDate?.endOf('day').toISOString()
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/perProjectOverview/topThree?startDate=${startDate}&endDate=${endDate}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.PerProjectTimeOverview, Error>({
    queryKey: pulseKeys.perProjectOverviewTopThree(startDate, endDate),
    queryFn,
    enabled: !!startDate && !!endDate,
  })
}
