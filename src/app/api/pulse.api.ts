import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'
import { pulseKeys } from './keys'

export function useLatestPulses() {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/pulse/latest`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbersApi.PulseDao[], Error>({
    queryKey: pulseKeys.latestPulses,
    queryFn,
  })
}
