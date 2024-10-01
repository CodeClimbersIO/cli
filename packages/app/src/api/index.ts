import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

export const BASE_API_URL = '/api/v1'

export const useBetterQuery = <T, Error>(
  options: UseQueryOptions<T, Error>,
): UseQueryResult<T, Error> & { isEmpty: boolean } => {
  const queryResult = useQuery<T, Error>(options)

  // Determine if the data is "empty"
  const isEmpty = queryResult.data
    ? Array.isArray(queryResult.data)
      ? queryResult.data.length === 0
      : Object.keys(queryResult.data).length === 0
    : true

  // Return the original query result with the isEmpty property
  return { ...queryResult, isEmpty }
}
