import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

interface TimeDataPointProps {
  title: string
  time: string
}

export const TimeDataPoint = ({ title, time }: TimeDataPointProps) => (
  <Grid2 xs={6} md={3} flexDirection="column" gap={0.5} display="flex">
    <Typography variant="body1" fontWeight="light">
      {title}
    </Typography>
    <Typography variant="body1" fontWeight="bold">
      {time}
    </Typography>
  </Grid2>
)
