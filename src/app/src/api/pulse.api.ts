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
