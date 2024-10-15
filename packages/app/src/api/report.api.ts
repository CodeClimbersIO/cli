import { Dayjs } from 'dayjs'
import { useBetterQuery } from '../services'
import { getWeeklyScores } from './services/report.service'
import { reportKeys } from './keys'

const useGetWeeklyReport = (selectedStartDate: Dayjs) => {
  const queryFn = () => getWeeklyScores(selectedStartDate)

  return useBetterQuery<CodeClimbers.WeeklyScores, Error>({
    queryKey: reportKeys.weeklyScores(selectedStartDate.toISOString()),
    queryFn,
    enabled: !!selectedStartDate,
  })
}

export { useGetWeeklyReport }
