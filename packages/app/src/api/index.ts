import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

export const BASE_API_URL = '/api/v1'

export const useBetterQuery = <TData, TResult = TData, Error = unknown>(
  options: Omit<UseQueryOptions<TData, Error, TResult>, 'initialData'> & {
    initialData?: () => undefined
  },
): UseQueryResult<TResult, Error> & { isEmpty: boolean } => {
  const queryResult = useQuery<TData, Error, TResult>(options)

  // Determine if the data is "empty"
  const isEmpty = queryResult.data
    ? Array.isArray(queryResult.data)
      ? queryResult.data.length === 0
      : Object.keys(queryResult.data).length === 0
    : true

  // Return the original query result with the isEmpty property
  return { ...queryResult, isEmpty }
}
