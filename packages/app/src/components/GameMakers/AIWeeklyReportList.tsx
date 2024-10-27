import { useState } from 'react'
import { useGetAiWeeklyReports } from '../../api/platformServer/gameSettings.platformApi'
import { Box, Chip } from '@mui/material'
import { PerformanceReviewFax } from '../PerformanceReviewFax'

export const AiWeeklyReportList = () => {
  const { data } = useGetAiWeeklyReports()
  const [selectedReport, setSelectedReport] = useState<number>(0)
  return (
    <Box
      sx={{
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        {data?.map((report, index) => (
          <Chip
            key={index}
            label={index + 1}
            variant={selectedReport === index ? 'filled' : 'outlined'}
            onClick={() => setSelectedReport(index)}
          />
        ))}
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <PerformanceReviewFax
          performanceReview={data?.[selectedReport]?.performanceReview || ''}
        />
      </Box>
    </Box>
  )
}
