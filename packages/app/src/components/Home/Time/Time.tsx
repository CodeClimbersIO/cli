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
        <Grid2 container spacing={2} justifyContent="space-between">
          <TimeDataPoint title="Week's longest day" time="8h 15m" />
          <TimeDataPoint title="Yesterday" time="6h 42m" />
          <TimeDataPoint title="Day's Total" time="1h 43m" />
          <TimeDataPoint title="Week Total" time="16h 12m" />
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
