import dayjs from 'dayjs'
import { Box, Stack } from '@mui/material'
import { DateHeader } from '../Home/DateHeader'
import { useState } from 'react'
import { useGetWeeklyReport } from '../../api/report.api'
import { ProjectScore } from './ProjectScore'
import { GrowthScore } from './GrowthScore'

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
      <Stack sx={{ alignItems: 'center' }}>
        <Stack gap={3} sx={{ maxWidth: '500px', width: '100%' }}>
          <ProjectScore
            projectScore={{
              ...weeklyScores?.projectTimeScore,
              breakdown: weeklyScores?.projectTimeScore
                .breakdown as CodeClimbers.PerProjectTimeOverviewDB[],
            }}
          />
          <GrowthScore
            growthScore={{
              ...weeklyScores?.growthScore,
              breakdown: weeklyScores?.growthScore
                .breakdown as CodeClimbers.EntityTimeOverviewDB[],
            }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
