import { LinearProgress, Typography, useTheme } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

interface SourceTimeChartProps {
  color: string
  time: string
  progress: number
}

export const SourceTimeChart = ({
  color,
  progress,
  time,
}: SourceTimeChartProps) => {
  const theme = useTheme()

  return (
    <Grid2
      container
      justifyContent="space-between"
      gap={3}
      alignItems="center"
      width="100%"
    >
      <Grid2 sx={{ flex: 1, width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={progress > 100 ? 100 : progress}
          sx={{
            alignSelf: 'center',
            width: '100%',
            backgroundColor: 'transparent',
            height: 12,
            '& .MuiLinearProgress-bar': {
              bottom: 0,
              top: 'auto',
              backgroundColor: color,
              height: 12,
            },
          }}
        />
      </Grid2>
      <Grid2>
        <Typography variant="body1" color={theme.palette.grey[300]}>
          {time}
        </Typography>
      </Grid2>
    </Grid2>
  )
}
