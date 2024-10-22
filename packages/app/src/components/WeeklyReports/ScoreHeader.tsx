import { Box, Typography } from '@mui/material'
import { getColorForRating } from '../../api/browser/services/report.service'

interface Props {
  title: string
  score: number
  rating: CodeClimbers.WeeklyScoreRating
}
export const ScoreHeader = ({ title, score, rating }: Props) => {
  const color = getColorForRating(rating)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h3" color={color.accent}>
        +{score}
      </Typography>
    </Box>
  )
}
