import { useMutation } from '@tanstack/react-query'
import queryApi from '../../services/query.service'

export const useRunSql = () => {
  return useMutation({
    mutationFn: (query: string) => queryApi.sqlQueryFn(query),
  })
}
