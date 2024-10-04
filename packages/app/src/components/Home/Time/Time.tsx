import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Dayjs } from 'dayjs'

import CategoryChart from './CategoryChart'
import DeepWork from '../DeepWork'
import { BossImage } from '../../common/Icons/BossImage'
import { useState } from 'react'
import { WeeklyReportDialog } from '../../common/WeeklyReportDialog'
import userService from '../../../services/user.service'
import { NotificationIcon } from '../../common/Icons/NotificationIcon'

type Props = { selectedDate: Dayjs }
export const Time = ({ selectedDate }: Props) => {
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false)
  const { data: user } = userService.useGetCurrentUser()

  const WeeklyReportSettings = () => {
    return (
      <Box
        sx={{ position: 'relative', padding: 0.5, cursor: 'pointer' }}
        onClick={() => {
          setIsWeeklyReportModalOpen(true)
        }}
      >
        <BossImage />
        {user?.weeklyReportType === 'none' && (
          <NotificationIcon
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 16,
              height: 16,
            }}
          />
        )}
      </Box>
    )
  }

  return (
    <Card
      raised={false}
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        width: '100%',
      }}
    >
      <CardContent
        sx={{
          padding: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Grid2>
            <Typography variant="h3">Time</Typography>
          </Grid2>
          <Grid2>
            <WeeklyReportSettings />
          </Grid2>
        </Grid2>
        <DeepWork selectedDate={selectedDate} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <CategoryChart selectedDate={selectedDate} />
      </CardContent>
      <WeeklyReportDialog
        open={isWeeklyReportModalOpen}
        onClose={() => setIsWeeklyReportModalOpen(false)}
      />
    </Card>
  )
}
