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
import {
  useCategoryTimeOverview,
  useWeekOverview,
} from '../../../api/pulse.api'
import { useEffect, useState } from 'react'

const categories = {
  coding: 'coding',
  browsing: 'browsing',
  debugging: 'debugging',
  communicating: 'communicating',
  designing: 'designing', // verify
}

export const Time = () => {
  const {
    data: weekOverview = {} as CodeClimbers.WeekOverview,
    isPending,
    isEmpty,
    isError,
    refetch,
  } = useWeekOverview('2023-11-29')

  const { data: categoryOverview = [] as CodeClimbers.TimeOverview[] } =
    useCategoryTimeOverview('2023-11-28', '2023-11-29')

  const [totalMinutes, setTotalMinutes] = useState(0)

  useEffect(() => {
    if (categoryOverview.length > 0)
      setTotalMinutes(
        categoryOverview.reduce((a, b) => {
          return a + b.minutes
        }, 0),
      )
  }, [categoryOverview])

  const getHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const minutesRemaining = minutes % 60

    return `${hours}h ${minutesRemaining}m`
  }

  const getCategoryMinutes = (category = '') => {
    const item = categoryOverview.find((cat) => cat.category === category)
    return item?.minutes ?? 0
  }

  const getPercentage = (category = '') => {
    return (getCategoryMinutes(category) / totalMinutes) * 100
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
        <TimeDataChart
          title="Code"
          time={getHours(getCategoryMinutes(categories.coding))}
          progress={getPercentage(categories.coding)}
          color="blue"
        />
        <TimeDataChart
          title="Communication"
          time={getHours(getCategoryMinutes(categories.communicating))}
          progress={getPercentage(categories.communicating)}
          color="purple"
        />
        <TimeDataChart
          title="Browsing"
          time={getHours(getCategoryMinutes(categories.browsing))}
          progress={getPercentage(categories.browsing)}
          color="green"
        />
        <TimeDataChart
          title="Design"
          time={getHours(getCategoryMinutes(categories.designing))}
          progress={getPercentage(categories.designing)}
          color="orange"
        />
      </CardContent>
    </Card>
  )
}
