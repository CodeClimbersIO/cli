import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

import { ScoreHeader } from './ScoreHeader'
import { getColorForRating } from '../../api/services/report.service'

interface Props {
  activeHoursScore: CodeClimbers.WeeklyScore & {
    breakdown: number
  }
}
export const ActiveHoursScore = ({ activeHoursScore }: Props) => {
  const color = getColorForRating(activeHoursScore.rating)
  const hours = Math.floor(activeHoursScore.breakdown / 60)
  const minutes = activeHoursScore.breakdown % 60
  const formattedTime = `${hours}h ${minutes}m`
  return (
    <Box>
      <ScoreHeader
        title="Active Hours"
        score={activeHoursScore.score}
        rating={activeHoursScore.rating}
      />
      <Card
        raised={false}
        sx={{
          boxShadow: 'none',
          borderRadius: 0,
          p: 2,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ flex: 1 }}>{formattedTime} total</Typography>
            <Stack gap={2} sx={{ flex: 2 }}>
              <Typography color={color.accent}>Optimal</Typography>
              <Typography>
                You are working a solid amount of hours each week. Keep it up!
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
