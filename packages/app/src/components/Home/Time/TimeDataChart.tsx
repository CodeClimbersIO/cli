import { useState, useCallback } from 'react'
import {
  Box,
  Typography,
  LinearProgress,
  IconButton,
  Collapse,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

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
  subCategoryColor?: string
}

export const TimeDataChart = ({
  title,
  color,
  progress,
  time,
  subCategories,
  subCategoryColor,
}: TimeDataChartProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpand = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  return (
    <Box>
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
              },
            }}
          />
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
                    <LinearProgress
                      variant="determinate"
                      value={subCategory.progress}
                      sx={{
                        width: '100%',
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'transparent',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: color,
                          borderRadius: 1,
                        },
                      }}
                    />
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
    </Box>
  )
}
