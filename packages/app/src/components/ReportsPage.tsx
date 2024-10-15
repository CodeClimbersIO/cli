import dayjs from 'dayjs'
import { Box } from '@mui/material'
import { useCategoryTimeByRange } from '../api/pulse.api'
import { DateHeader } from './Home/DateHeader'
import { useState } from 'react'
import { useGetWeeklyReport } from '../api/report.api'

export const ReportsPage = () => {
  const period = 'week'
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf(period))
  const { data: categoryTime } = useCategoryTimeByRange(dayjs(), dayjs())
  const { data: weeklyScores } = useGetWeeklyReport(selectedDate)
  console.log('weeklyScores', weeklyScores)
  return (
    <Box sx={{ padding: '2rem' }}>
      <DateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        period={period}
        title="Reports"
      />
    </Box>
  )
}
