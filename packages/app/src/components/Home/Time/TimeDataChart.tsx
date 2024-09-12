import {
  Box,
  Collapse,
  emphasize,
  IconButton,
  LinearProgress,
  rgbToHex,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useCallback, useState } from 'react'

interface SubCategory {
  title: string
  time: string
  progress: number
}

interface TimeDataChartProps {
  title: string
  color: string
  time: string
  progress: number
  subCategories?: SubCategory[]
}

export const TimeDataChart = ({
  title,
  color,
  progress,
  time,
  subCategories
}: TimeDataChartProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const Progress = ({ progress }: { progress: number }) => {
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
    <Grid2>
      <Grid2
        container
        justifyContent="space-between"
        gap={3}
        alignItems="center"
      >
        <Grid2 sx={{ minWidth: 120 }}>
          <Typography variant="body1">{title}</Typography>
        </Grid2>
        <Grid2 sx={{ flex: 1 }}>
          <Progress progress={progress} />
        </Grid2>
        <Grid2>
          <Typography variant="body1" fontWeight="bold">
            {time}
          </Typography>
        </Grid2>
        {subCategories && (
          <IconButton onClick={handleExpand}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Grid2>
      <Collapse in={expanded}>
        <Box mt={2} ml={4} sx={{ fontSize: '0.9em' }}>
          <Grid2 container direction="column" spacing={1}>
            {subCategories?.map((subCategory, index) => (
              <Grid2 key={index}>
                <Grid2
                  container
                  justifyContent="space-between"
                  gap={1}
                  alignItems="center"
                >
                  <Grid2 sx={{ minWidth: 120 }}>
                    <Typography variant="body2">{subCategory.title}</Typography>
                  </Grid2>
                  <Grid2 sx={{ flex: 1 }}>
                    <Progress progress={subCategory.progress} />
                  </Grid2>
                  <Grid2>
                    <Typography variant="body2">{subCategory.time}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Collapse>
    </Grid2>
  )
}
