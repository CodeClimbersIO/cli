import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

import { ScoreHeader } from './ScoreHeader'
import { getColorForRating } from '../../api/browser/services/report.service'

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

  const [title, description] = activeHoursScore.recommendation?.split('-') ?? []
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
          backgroundColor: (theme) => theme.palette.background.paper_raised,
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
              <Typography color={color.accent}>{title}</Typography>
              <Typography>{description}</Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
