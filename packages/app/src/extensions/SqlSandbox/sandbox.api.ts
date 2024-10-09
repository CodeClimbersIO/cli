import { useMutation } from '@tanstack/react-query'
import { sqlQueryFn } from '../../api/services/query.service'

export const useRunSql = () => {
  return useMutation({
    mutationFn: (query: string) => sqlQueryFn(query),
  })
}
