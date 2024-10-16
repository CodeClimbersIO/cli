import dayjs from 'dayjs'
import { Box } from '@mui/material'
import { useCategoryTimeByRange } from '../../api/pulse.api'
import { DateHeader } from '../Home/DateHeader'
import { useState } from 'react'
import { useGetWeeklyReport } from '../../api/report.api'
import { Bar } from 'react-chartjs-2'
import { ProjectScore } from './ProjectScore'

export const ReportsPage = () => {
  const period = 'week'
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf(period))
  const { data: weeklyScores, isPending } = useGetWeeklyReport(selectedDate)
  if (isPending || !weeklyScores) {
    return <div>Loading</div>
  }
  return (
    <Box sx={{ padding: '2rem' }}>
      <DateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        period={period}
        title="Reports"
      />
      <ProjectScore
        projectScore={{
          ...weeklyScores?.projectTimeScore,
          breakdown: weeklyScores?.projectTimeScore
            .breakdown as CodeClimbers.PerProjectTimeOverviewDB[],
        }}
      />
    </Box>
  )
}
