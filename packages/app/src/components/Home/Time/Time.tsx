import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Dayjs } from 'dayjs'

import { BossImage } from '../../common/Icons/BossImage'
import { useState } from 'react'
import { WeeklyReportDialog } from '../../common/WeeklyReportDialog'
import { NotificationIcon } from '../../common/Icons/NotificationIcon'
import { DeepWork } from '../DeepWork'
import { CategoryChart } from './CategoryChart'
import { useGetCurrentUser } from '../../../api/user.api'

type Props = { selectedDate: Dayjs }
export const Time = ({ selectedDate }: Props) => {
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false)
  // const { data: user } = useGetCurrentUser()
  // const WeeklyReportSettings = () => {
  //   const showNotificationIcon = user?.weeklyReportType === '' && !user?.email
  //   return (
  //     <Box
  //       sx={{ position: 'relative', padding: 0.5, cursor: 'pointer' }}
  //       onClick={() => {
  //         setIsWeeklyReportModalOpen(true)
  //       }}
  //     >
  //       <BossImage />
  //       {showNotificationIcon && (
  //         <NotificationIcon
  //           height={16}
  //           width={16}
  //           sx={{
  //             position: 'absolute',
  //             top: 0,
  //             right: 0,
  //           }}
  //         />
  //       )}
  //     </Box>
  //   )
  // }

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
          {/* <Grid2>
            <WeeklyReportSettings />
          </Grid2> */}
        </Grid2>
        <DeepWork selectedDate={selectedDate} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <CategoryChart selectedDate={selectedDate} />
      </CardContent>
      {/* {user && isWeeklyReportModalOpen && (
        <WeeklyReportDialog
          user={user}
          open={isWeeklyReportModalOpen}
          onClose={() => setIsWeeklyReportModalOpen(false)}
        />
      )} */}
    </Card>
  )
}
