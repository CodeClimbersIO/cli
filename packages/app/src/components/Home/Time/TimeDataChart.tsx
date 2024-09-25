import {
  Box,
  Collapse,
  emphasize,
  LinearProgress,
  rgbToHex,
  Typography,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
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
  // Placeholder for real chart data
  progress: number
  subCategories?: SubCategory[]
}

const Progress = ({
  progress,
  hasSubCategories,
  color,
}: {
  progress: number
  hasSubCategories?: boolean
  color: string
}) => {
  const progressBars = []
  let remainingProgress = progress
  const laps = Math.ceil(progress / 100)
  let currentColor = color
  const hoverColor = emphasize(currentColor, 0.4)
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
          margin: '0 auto',
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
  return (
    <Box
      sx={{
        position: 'relative',
        ...(hasSubCategories && {
          '&:hover .MuiLinearProgress-bar': {
            backgroundColor: hoverColor,
          },
        }),
      }}
    >
      {progressBars}
    </Box>
  )
}

const SubCategoryItem = ({
  title,
  time,
  progress,
  color,
}: {
  title: string
  time: string
  progress: number
  color: string
}) => (
  <Grid2 container justifyContent="space-between" gap={4}>
    <Grid2 sx={{ minWidth: 120 }}>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '120px',
        }}
      >
        {title}
      </Typography>
    </Grid2>
    <Grid2 sx={{ flex: 1 }}>
      <>
        <Progress progress={progress} color={color} />
      </>
    </Grid2>
    <Grid2>
      <Typography variant="body2">{time}</Typography>
    </Grid2>
  </Grid2>
)

const SubCategoryList = ({
  subCategories,
  color,
}: {
  subCategories: SubCategory[]
  color: string
}) => (
  <Box mt={2} ml={4} sx={{ fontSize: '0.9em' }}>
    <Grid2
      container
      direction="column"
      spacing={2}
      justifyContent="space-between"
    >
      {subCategories.map((subCategory, index) => (
        <Grid2 sx={{ flex: 1 }} key={index}>
          <SubCategoryItem
            title={subCategory.title}
            time={subCategory.time}
            progress={subCategory.progress}
            color={color}
          />
        </Grid2>
      ))}
    </Grid2>
  </Box>
)

export const TimeDataChart = ({
  title,
  color,
  progress,
  time,
  subCategories,
}: TimeDataChartProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const hasSubCategories = subCategories && subCategories.length > 0

  return (
    <Box>
      <Grid2
        container
        justifyContent="space-between"
        gap={3}
        {...(hasSubCategories && {
          onClick: handleExpand,
          sx: { cursor: 'pointer' },
        })}
      >
        <Grid2 sx={{ minWidth: 120 }}>
          <Typography variant="body1">{title}</Typography>
        </Grid2>
        <Grid2 sx={{ flex: 1 }}>
          <>
            <Progress
              progress={progress}
              color={color}
              hasSubCategories={hasSubCategories}
            />
          </>
        </Grid2>
        <Grid2>
          <Typography variant="body1" fontWeight="bold">
            {time}
          </Typography>
        </Grid2>
      </Grid2>

      {hasSubCategories && (
        <Collapse in={expanded}>
          <SubCategoryList subCategories={subCategories} color={color} />
        </Collapse>
      )}
    </Box>
  )
}
