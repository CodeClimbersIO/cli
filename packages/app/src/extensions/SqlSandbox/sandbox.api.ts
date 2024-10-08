import { useMutation } from '@tanstack/react-query'
import queryService from '../../api/services/query.service'

export const useRunSql = () => {
  return useMutation({
    mutationFn: (query: string) => queryService.sqlQueryFn(query),
  })
}
