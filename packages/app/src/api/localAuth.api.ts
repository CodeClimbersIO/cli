import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'

export function useGetLocalApiKey(enabled = true) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/local-auth`,
      method: 'GET',
    })
  return useBetterQuery<void, Error>({
    queryKey: ['local-auth'],
    queryFn,
    enabled,
    retry: false,
  })
}

export function useImportLocalApiKey() {
  const mutationFn = ({ apiKey }: { apiKey: string }) =>
    apiRequest({
      url: `${BASE_API_URL}/local-auth/import`,
      method: 'GET',
      headers: { 'x-api-key': apiKey },
      credentials: 'include',
    })
  return useMutation({
    mutationFn,
  })
}

export function useHasValidLocalAuthCookie(
  page: 'import' | 'home' | 'banner' = 'home',
) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/local-auth/has-valid-cookie`,
      method: 'GET',
      credentials: 'include',
    })
  return useBetterQuery<{ isValid: boolean }, Error>({
    queryKey: ['local-auth/has-valid-cookie', page],
    queryFn,
    retry: false,
  })
}
