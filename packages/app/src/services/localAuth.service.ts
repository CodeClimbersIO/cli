import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../api/request'

export const useGetLocalApiKey = (enabled = true) => {
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

export const useValidateLocalApiKey = (
  page: 'import' | 'home' | 'banner' = 'home',
) => {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/auth/local/validate`,
      method: 'GET',
    })
  return useBetterQuery<{ isValid: boolean }, Error>({
    queryKey: ['local-auth/has-valid-cookie', page],
    queryFn,
    refetchOnWindowFocus: 'always',
    retry: false,
  })
}
