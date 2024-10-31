import { platformApiRequest } from '../request'

import { PLATFORM_API_URL, useBetterQuery } from '..'
import { weeklyReportKeys } from './keys'

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
