import { MoreVert } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { TimeDataPoint } from './TimeDataPoint'
import { TimeDataChart } from './TimeDataChart'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useWeekOverview } from '../../../api/pulse.api'

export const Time = () => {
  const {
    data: weekOverview = {} as CodeClimbers.WeekOverview,
    isPending,
    isEmpty,
    isError,
    refetch,
  } = useWeekOverview('2023-11-29')

  const getHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const minutesRemaining = minutes % 60

    return `${hours}h ${minutesRemaining}m`
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
            <IconButton>
              <MoreVert />
            </IconButton>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} justifyContent="space-between">
          <TimeDataPoint
            title="Week's longest day"
            time={getHours(weekOverview.longestDayMinutes)}
          />
          <TimeDataPoint
            title="Yesterday"
            time={getHours(weekOverview.yesterdayMinutes)}
          />
          <TimeDataPoint
            title="Day's Total"
            time={getHours(weekOverview.todayMinutes)}
          />
          <TimeDataPoint
            title="Week Total"
            time={getHours(weekOverview.weekMinutes)}
          />
        </Grid2>
        <Divider />
        <TimeDataChart
          title="Deep Work"
          time="1h 43m"
          progress={30}
          color="red"
        />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <TimeDataChart title="Code" time="1h 24m" progress={25} color="blue" />
        <TimeDataChart
          title="Communication"
          time="3h 40m"
          progress={40}
          color="purple"
        />
        <TimeDataChart
          title="Browsing"
          time="2h 1m"
          progress={15}
          color="green"
        />
        <TimeDataChart
          title="Design"
          time="3h 5m"
          progress={34}
          color="orange"
        />
      </CardContent>
    </Card>
  )
}
