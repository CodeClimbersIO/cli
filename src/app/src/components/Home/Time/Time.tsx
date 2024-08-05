import { MoreVert } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import { TimeDataChart } from './TimeDataChart'
import WeekOverview from './WeekOverview'
import CategoryChart from './CategoryChart'

export const Time = () => {
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
        <WeekOverview />
        <Divider />
        <TimeDataChart
          title="Deep Work"
          time="1h 43m"
          progress={30}
          color="red"
        />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <CategoryChart />
      </CardContent>
    </Card>
  )
}
