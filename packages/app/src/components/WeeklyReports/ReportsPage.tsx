import dayjs from 'dayjs'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { DateHeader } from '../Home/DateHeader'
import { useState } from 'react'
import { useGetWeeklyReport } from '../../api/report.api'
import { ProjectScore } from './ProjectScore'
import { GrowthScore } from './GrowthScore'
import { DeepWorkScore } from './DeepWorkScore'
import { ActiveHoursScore } from './ActiveHoursScore'
import { Logo } from '../common/Logo/Logo'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

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
        <Stack
          gap={4}
          sx={{
            maxWidth: '550px',
            width: '100%',
            background: (theme) => theme.palette.background.paper,
            p: 4,
          }}
        >
          <Stack gap={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Logo />
              <Stack gap={1} sx={{ alignItems: 'flex-end' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {weeklyScores.totalScore.score}/10
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    textAlign: 'center',
                    height: 'auto',
                  }}
                >
                  <InfoOutlinedIcon fontSize="inherit" /> Overall Score
                </Typography>
              </Stack>
            </Box>
            <Divider />
          </Stack>
          <DeepWorkScore
            deepWorkScore={{
              ...weeklyScores?.deepWorkTimeScore,
              breakdown: weeklyScores?.deepWorkTimeScore
                .breakdown as CodeClimbers.DeepWorkPeriod[],
            }}
          />
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
          <ActiveHoursScore
            activeHoursScore={{
              ...weeklyScores?.totalTimeScore,
              breakdown: weeklyScores?.totalTimeScore.breakdown as number,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
