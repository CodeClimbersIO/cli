import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'

export function useGetLocalApiKey(enabled = true) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/auth/local`,
      method: 'GET',
    })
  return useBetterQuery<{ apiKey: string }, Error>({
    queryKey: ['local-auth'],
    queryFn,
    enabled,
    retry: false,
  })
}

export function useValidateLocalApiKey(
  page: 'import' | 'home' | 'banner' = 'home',
) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/auth/local/validate`,
      method: 'GET',
    })
  return useBetterQuery<{ isValid: boolean }, Error>({
    queryKey: ['local-auth/has-valid-cookie', page],
    queryFn,
    retry: false,
  })
}
