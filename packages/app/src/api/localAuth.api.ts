import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'

export function useGetLocalApiKey() {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/local-auth`,
      method: 'GET',
    })
  return useBetterQuery<void, Error>({
    queryKey: ['local-auth'],
    queryFn,
  })
}

export function useImportLocalApiKey(
  apiKey = 'd9c3cf5b-07c5-407e-b4f9-01ddeb8feecd',
) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/local-auth/import`,
      method: 'GET',
      headers: { 'x-api-key': apiKey },
      credentials: 'include',
    })
  return useBetterQuery<CodeClimbers.LocalAuthDao, Error>({
    queryKey: ['local-auth/import'],
    queryFn,
  })
}
