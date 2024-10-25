import { Box, Divider, Stack } from '@mui/material'
import { BossImage } from './common/Icons/BossImage'

interface Props {
  performanceReview: string
}

export const PerformanceReviewFax = ({ performanceReview }: Props) => {
  return (
    <Box sx={{ backgroundColor: '#FAF7F7', m: 2, color: '#000', p: 8 }}>
      <Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BossImage variant="happy" width={96} height={96} />
          <Stack>
            <pre style={{ margin: 0, marginBottom: '24px' }}>
              From: Timothy Brother
            </pre>
            <pre style={{ margin: 0 }}>Subject: Comments on Your Week</pre>
          </Stack>
        </Box>
        <Divider
          sx={{ my: 4, backgroundColor: '#000', borderBottomWidth: 2 }}
        />
      </Stack>
      <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
        {performanceReview}
      </pre>
    </Box>
  )
}
