import { LinearProgress, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

interface TimeDataChartProps {
  title: string
  color: string
  time: string
  // Placeholder for real chart data
  progress: number
}

// Purely a placeholder for the chart that we want. Just gets a structure to build on.
export const TimeDataChart = ({
  title,
  color,
  progress,
  time,
}: TimeDataChartProps) => (
  <Grid2 container justifyContent="space-between" gap={3} alignItems="center">
    <Grid2 sx={{ minWidth: 120 }}>
      <Typography variant="body1">{title}</Typography>
    </Grid2>
    <Grid2 sx={{ flex: 1 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: '100%',
          py: 1.5,
          borderRadius: 1,
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 1,
            opacity: 0.6,
          },
        }}
      />
    </Grid2>
    <Grid2>
      <Typography variant="bod1" fontWeight="bold">
        {time}
      </Typography>
    </Grid2>
  </Grid2>
)
