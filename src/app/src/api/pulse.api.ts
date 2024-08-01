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

export function useWeekOverview(date = '') {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulses/weekOverview?date=${date}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.WeekOverview, Error>({
    queryKey: pulseKeys.weekOverview,
    queryFn,
  })
}
