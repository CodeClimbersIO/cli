import { Dayjs } from 'dayjs'
import { useBetterQuery } from '../services'
import { pulseKeys } from './keys'
import { getDeepWorkBetweenDates } from './services/pulse.service'

interface DeepWorkPeriod {
  startDate: string
  endDate: string
  time: number
}

const useDeepWorkV2 = (selectedStartDate: Dayjs, selectedEndDate: Dayjs) => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const queryFn = () =>
    getDeepWorkBetweenDates(selectedStartDate, selectedEndDate)

  return useBetterQuery<DeepWorkPeriod[], Error>({
    queryKey: pulseKeys.deepWork(startDate, endDate),
    queryFn,
    enabled: !!selectedStartDate && !!selectedEndDate,
  })
}

export { useDeepWorkV2 }
