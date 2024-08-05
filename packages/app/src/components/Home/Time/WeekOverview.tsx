import { CircularProgress } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Dayjs } from 'dayjs'

import { useWeekOverview } from '../../../api/pulse.api'
import { TimeDataPoint } from './TimeDataPoint'
import { minutesToHours } from './utils'

type Props = { selectedDate: Dayjs }
const WeekOverview = ({ selectedDate }: Props) => {
  const { data: weekOverview = {} as CodeClimbers.WeekOverview, isPending } =
    useWeekOverview(selectedDate?.toISOString() ?? '')

  if (isPending) return <CircularProgress />

  return (
    <Grid2 container spacing={2} justifyContent="space-between">
      <TimeDataPoint
        title="Week's longest day"
        time={minutesToHours(weekOverview.longestDayMinutes)}
      />
      <TimeDataPoint
        title="Yesterday"
        time={minutesToHours(weekOverview.yesterdayMinutes)}
      />
      <TimeDataPoint
        title="Day's Total"
        time={minutesToHours(weekOverview.todayMinutes)}
      />
      <TimeDataPoint
        title="Week Total"
        time={minutesToHours(weekOverview.weekMinutes)}
      />
    </Grid2>
  )
}

export default WeekOverview
