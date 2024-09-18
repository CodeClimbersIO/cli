import { BASE_API_URL, useBetterQuery } from '.'
import { apiRequest } from '../utils/request'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetLocalSqlQuery<T = any>(query: string) {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/localdb/query`,
      method: 'POST',
      body: { query },
      credentials: 'include',
    })
  return useBetterQuery<T[], Error>({
    queryKey: ['localdb/query'],
    queryFn,
  })
}
