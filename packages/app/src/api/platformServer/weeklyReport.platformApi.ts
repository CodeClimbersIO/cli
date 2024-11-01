import { platformApiRequest } from '../request'

import { PLATFORM_API_URL, useBetterQuery } from '..'
import { weeklyReportKeys } from './keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetAiWeeklyReport = (startOfWeek: string, email?: string) => {
  const queryFn = () =>
    platformApiRequest({
      url: `${PLATFORM_API_URL}/ai-weekly-report?email=${email}&startOfWeek=${startOfWeek}`,
      method: 'GET',
    })
  return useBetterQuery<string, Error>({
    queryKey: weeklyReportKeys.aiWeeklyReports(startOfWeek),
    queryFn,
    enabled: !!email,
  })
}

export const useGenerateAiWeeklyReport = () => {
  const queryClient = useQueryClient()
  let startOfWeek: string
  const mutationFn = (body: {
    email: string
    startOfWeek: string
    weeklyReport: CodeClimbers.WeeklyScores
  }) => {
    startOfWeek = body.startOfWeek
    return platformApiRequest({
      url: `${PLATFORM_API_URL}/ai-weekly-report`,
      method: 'POST',
      body,
    })
  }
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: weeklyReportKeys.aiWeeklyReports(startOfWeek),
      })
    },
  })
}
