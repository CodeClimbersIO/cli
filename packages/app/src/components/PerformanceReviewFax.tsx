import { Box, Divider, Stack, Typography } from '@mui/material'
import { BossImage } from './common/Icons/BossImage'

interface Props {
  performanceReview: string
}

export const PerformanceReviewFax = ({ performanceReview }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.common.white,
        color: (theme) => theme.palette.common.black,
        p: 6,
      }}
    >
      <Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BossImage variant="happy" width={64} height={64} />
          <Stack>
            <Typography
              variant="monospace"
              style={{ margin: 0, marginBottom: '12px' }}
            >
              From: Timothy Brother
            </Typography>
            <Typography variant="monospace" style={{ margin: 0 }}>
              Subject: Comments on Your Week
            </Typography>
          </Stack>
        </Box>
        <Divider
          sx={{ my: 4, backgroundColor: '#000', borderBottomWidth: 2 }}
        />
      </Stack>
      <Typography
        variant="monospace"
        style={{ whiteSpace: 'pre-wrap', margin: 0 }}
      >
        {performanceReview}
      </Typography>
    </Box>
  )
}
