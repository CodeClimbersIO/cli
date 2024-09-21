import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'

export function useGetHealth() {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/health`,
      method: 'GET',
    })
  return useBetterQuery({
    queryKey: ['health'],
    queryFn,
    refetchOnWindowFocus: 'always',
    select: (data) => {
      if (data.OK && data.app === 'codeclimbers') {
        return true
      }
      return false
    },
  })
}

export function useGetLocalVersion() {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/health`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.Health, Error>({
    queryKey: ['health'],
    queryFn,
    refetchOnWindowFocus: true,
  })
}
