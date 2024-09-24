import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'

export function useGetHealth(
  {
    refetchInterval = 1000,
    retry = false,
  }: {
    refetchInterval?: number | false
    retry?: boolean
  } = {},
  page: 'home' | 'install' = 'home',
) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/health`,
      method: 'GET',
    })
  return useBetterQuery({
    queryKey: ['health', page],
    queryFn,
    refetchInterval,
    retry,
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
