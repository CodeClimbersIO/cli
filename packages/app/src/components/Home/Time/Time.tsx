import { Card, CardContent, Divider, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Dayjs } from 'dayjs'

import CategoryChart from './CategoryChart'
import DeepWork from '../DeepWork'
import { BossImage } from '../../common/Icons/BossImage'
import { useState } from 'react'
import { WeeklyReportDialog } from '../../common/WeeklyReportDialog'

type Props = { selectedDate: Dayjs }
export const Time = ({ selectedDate }: Props) => {
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false)

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
            <BossImage
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsWeeklyReportModalOpen(true)
              }}
            />
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
