import { Dayjs } from 'dayjs'
import pulseRepo from '../repos/pulse.repo'
import queryService from './query.service'

interface DeepWorkPeriod {
  startDate: string
  endDate: string
  time: number
}

const getDeepWork = async (
  selectedStartDate: Dayjs,
  selectedEndDate: Dayjs,
): Promise<DeepWorkPeriod[]> => {
  const startDate = selectedStartDate?.startOf('day').toISOString()
  const endDate = selectedEndDate?.endOf('day').toISOString()

  const deepWorkSql = pulseRepo.getDeepWork(startDate, endDate)

  const records: CodeClimbers.DeepWorkTime[] =
    await queryService.sqlQueryFn(deepWorkSql)

  const periods: DeepWorkPeriod[] = []
  let currentPeriod: DeepWorkPeriod | null = null

  const isSameDay = (date1: string, date2: string) => {
    return new Date(date1).toDateString() === new Date(date2).toDateString()
  }

  records.forEach((item) => {
    if (currentPeriod && isSameDay(currentPeriod.startDate, item.flowStart)) {
      currentPeriod.endDate = item.flowStart
      currentPeriod.time += item.flowTime
    } else {
      if (currentPeriod) {
        periods.push(currentPeriod)
      }
      currentPeriod = {
        startDate: item.flowStart,
        endDate: item.flowStart,
        time: item.flowTime,
      }
    }
  })

  if (currentPeriod) {
    periods.push(currentPeriod)
  }

  return periods
}

export default {
  getDeepWork,
}
