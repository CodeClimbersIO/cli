import { useCallback } from 'react'
import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'
import { pulseKeys } from './keys'

export function useLatestPulses() {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/latest`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.Pulse[], Error>({
    queryKey: pulseKeys.latestPulses,
    queryFn,
  })
}

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

export function useExportPulses() {
  const exportPulses = useCallback(async () => {
    try {
      const response = await apiRequest({
        url: `${BASE_API_URL}/pulses/export`,
        method: 'GET',
        responseType: 'blob',
      })

      const blob = new Blob([response])
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pulses.csv'
      a.click()
      window.URL.revokeObjectURL(url)
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

export function useCategoryTimeOverview(startDate = '', endDate = '') {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/categoryTimeOverview?startDate=${startDate}&endDate=${endDate}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.TimeOverview[], Error>({
    queryKey: pulseKeys.categoryTimeOverview(startDate, endDate),
    queryFn,
    enabled: !!startDate && !!endDate,
    select: (data) => {
      return (
        data.map((day) => {
          if (day.category === 'communication') day.category = 'communicating'
          return { ...day }
        }) || []
      )
    },
  })
}
