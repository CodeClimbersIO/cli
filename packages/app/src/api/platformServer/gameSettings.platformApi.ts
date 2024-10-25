import { PLATFORM_API_URL, useBetterQuery } from '..'
import { gamemakerKeys } from './keys'
import { platformApiRequest } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useGetGameSettings = (id: string) => {
  const queryFn = () =>
    platformApiRequest({
      url: `${PLATFORM_API_URL}/game-maker/settings/${id}`,
      method: 'GET',
    })
  return useBetterQuery({
    queryKey: gamemakerKeys.gameSettings(id),
    queryFn,
    enabled: !!id,
  })
}

const useGetAiWeeklyReports = () => {
  const queryFn = () =>
    platformApiRequest({
      url: `${PLATFORM_API_URL}/game-maker/ai-weekly-reports`,
      method: 'GET',
    })
  return useBetterQuery<
    { email: string; startOfWeek: string; performanceReview: string }[],
    Error
  >({
    queryKey: gamemakerKeys.aiWeeklyReports,
    select: (data) => data.reverse().slice(0, 10),
    queryFn,
  })
}

type UpdateGameSettingsProps = {
  id: string
  settings: object
}
const useUpdateGameSettings = () => {
  const mutationFn = ({ id, settings }: UpdateGameSettingsProps) =>
    platformApiRequest({
      url: `${PLATFORM_API_URL}/game-maker/settings/${id}`,
      method: 'POST',
      body: settings,
    })
  return useMutation({
    mutationFn,
  })
}

const useRunAiWeeklyReport = () => {
  const queryClient = useQueryClient()
  const mutationFn = (body: {
    email: string
    startOfWeek: string
    weeklyReport: CodeClimbers.WeeklyScores
  }) =>
    platformApiRequest({
      url: `${PLATFORM_API_URL}/game-maker/ai-weekly-reports`,
      method: 'POST',
      body,
    })
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamemakerKeys.aiWeeklyReports })
    },
  })
}

export {
  useGetGameSettings,
  useUpdateGameSettings,
  useRunAiWeeklyReport,
  useGetAiWeeklyReports,
}
