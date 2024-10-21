import { Dayjs } from 'dayjs'
import { BASE_API_URL, useBetterQuery } from '..'
import { reportKeys } from './keys'
import { apiRequest } from '../request'

const useGetLocalServerWeeklyReport = (selectedStartDate: Dayjs) => {
  const queryFn = () =>
    apiRequest({
      url: `${BASE_API_URL}/reports/weekly-report?startDate=${selectedStartDate.toISOString()}`,
      method: 'GET',
    })
  return useBetterQuery<CodeClimbers.WeeklyScores, Error>({
    queryKey: reportKeys.weeklyScores(selectedStartDate.toISOString()),
    queryFn,
    enabled: !!selectedStartDate,
  })
}

export { useGetLocalServerWeeklyReport }
