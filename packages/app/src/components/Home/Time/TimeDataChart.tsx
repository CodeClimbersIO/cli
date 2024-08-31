import {
  Box,
  emphasize,
  LinearProgress,
  rgbToHex,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

interface TimeDataChartProps {
  title: string
  color: string
  time: string
  // Placeholder for real chart data
  progress: number
}

export const TimeDataChart = ({
  title,
  color,
  progress,
  time,
}: TimeDataChartProps) => {
  const Progress = () => {
    const progressBars = []
    let remainingProgress = progress
    const laps = Math.ceil(progress / 100)
    let currentColor = color
    for (let i = 0; i < laps; i++) {
      const height = (laps - i) / laps
      const assignedColor = rgbToHex(currentColor)
      progressBars.push(
        <LinearProgress
          variant="determinate"
          value={remainingProgress > 100 ? 100 : remainingProgress}
          key={i}
          sx={{
            position: 'absolute',
            width: '100%',
            py: 1.5,
            borderRadius: 1,
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              bottom: 0,
              top: 'auto',
              backgroundColor: `${assignedColor}`,
              borderRadius: 1,
              height: height * 100 + '%',
            },
          }}
        />,
      )
      currentColor = emphasize(currentColor, 0.3)
      remainingProgress -= 100
    }
    return <Box sx={{ position: 'relative' }}>{progressBars}</Box>
  }
  return (
    <Grid2 container justifyContent="space-between" gap={3} alignItems="center">
      <Grid2 sx={{ minWidth: 120 }}>
        <Typography variant="body1">{title}</Typography>
      </Grid2>
      <Grid2 sx={{ flex: 1 }}>
        <>
          <Progress />
        </>
      </Grid2>
      <Grid2>
        <Typography variant="body1" fontWeight="bold">
          {time}
        </Typography>
      </Grid2>
    </Grid2>
  )
}
